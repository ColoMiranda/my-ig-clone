import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './Firebase';

function Post({ postId, userName, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapsot) => {
          setComments(snapsot.docs.map((doc) => doc.data()));
        });
    };

    return () => {
      unsubscribe();
    };

  }, [postId]);

  const postComment = (event) => {

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
    </div>
  );
}

export default Post;