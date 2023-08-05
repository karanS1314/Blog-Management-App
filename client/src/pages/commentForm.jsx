import React, { useState } from 'react';
import "../styles/comment_styles.css";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <textarea
        className='comment-input'
        value={comment}
        onChange={handleChange}
        placeholder="Write your comment..."
      />
      <button className='comment-submit' type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;