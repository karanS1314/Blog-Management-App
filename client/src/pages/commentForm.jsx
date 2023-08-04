// Comment.js

import React, { useState, useEffect } from 'react';
const Comment = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Load comments from local storage on component mount
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      const newComments = [...comments, commentText];
      setComments(newComments);
      setCommentText('');

      // Save comments to local storage
      localStorage.setItem('comments', JSON.stringify(newComments));
    }
  };

  return (
    <div className="comment-container">
      <button className="comment-button" onClick={handleAddComment}>
        Add Comment
      </button>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          {comment}
        </div>
      ))}
      <div className="comment-form" style={{ display: 'none' }}>
        <textarea
          className="comment-input"
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Enter your comment..."
        />
        <button className="comment-submit" onClick={handleAddComment}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Comment;