import React, { useState } from "react";
import { Button, Input } from '@material-ui/core';

function ImageUpload() {
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  
  return (
    <div>
      
      <Input 
        type="text"
        placeholder="Enter a caption..."
        onChange={event => setCaption(event.target.value)}
        value={caption}
      />
      
      <Input type="file" onChange={handleChange}/>
      
      <Button onClick={handleUpload}>
        Upload
      </Button>
    
    </div>
  )
}

export default ImageUpload