import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './Firebase';
import firebase from 'firebase';

function Post({ postId, user, userName, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapsot) => {
          setComments(snapsot.docs.map((doc) => doc.data()));
        });
    };

    return () => {
      unsubscribe();
    };

  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className="post">

      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={userName}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{userName}</h3>
      </div>

      <img
        className="post__image"
        src={imageUrl}
        alt=""
      />

      <h4 className="post__text"><strong>{userName}</strong> {caption} </h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p className="post__commentRow">
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button disabled={!comment} className="post__button" type="submit" onClick={postComment}>
            Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;