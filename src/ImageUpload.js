import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import firebase from "firebase";
import { db, storage } from "./Firebase";

function ImageUpload({username}) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Upload progress...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        
        setProgress(progress);
      },

      (error) => {
        // Error function...
        console.log(error);
        alert(error.message);
      },

      () => {
        // Complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collections("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              userName: username
            })
          }

          )

      }
    )
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter a caption..."
        onChange={event => setCaption(event.target.value)}
        value={caption}
      />

      <Input type="file" onChange={handleChange} />

      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;