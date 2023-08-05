import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from '../components/Navbar';
import {AiOutlineLike} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {BsBookmarkPlus} from 'react-icons/bs';
import CommentForm from './commentForm';
import "../styles/post.css";

const Post = () => {
    const {id} = useParams();
    // console.log(id);
    const postArray = JSON.parse(window.localStorage.getItem("posts"));
    
    const index = postArray.findIndex(e => e.id == id);
    const post = postArray[index];
    postArray.splice(index,1);

    const [count,setCount] = useState(0);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [comments, setComments] = useState([]);

    const handleCommentClick = () => {
      setShowCommentForm(true);
    };

    const handleCommentSubmit = (comment) => {
      setComments([...comments, comment]);
      post.comments = comments;
      post.comments.push(comment);
      // console.log(post.comments);
      // console.log(comment);
      postArray.push(post);
      window.localStorage.setItem("posts",JSON.stringify(postArray));
      setShowCommentForm(false);
  };
    const updateLikes = () =>{
      setCount((precount) => precount+1);
      // console.log(count);
      if(count % 2 ==1){
        post.likes -= 1;
      }
      else{
        post.likes +=1;
      }
      postArray.push(post);
      window.localStorage.removeItem("posts");
      window.localStorage.setItem("posts",JSON.stringify(postArray));

      console.log(postArray);
    }
  
  return (
    <>
      <Navbar />
      <section className='post-container'>
        <div className='post-content'>
          Author: {post.author}
        </div>
        <div className='post-title'>
          {post.title}
        </div>
        <div className='post-topics'>
          Published on: {post.date}
        </div>
        <div className='post-content'>
          {post.description}
        </div>
        <div className='post-topics'>
          {post.topic}
        </div>
        <div className='post-topics'>
          {post.minReadTime}
        </div>
        
        <div className='post-footer'>
          <span onClick={updateLikes}><AiOutlineLike /> {post.likes}</span>
          {showCommentForm ? (
            <CommentForm onSubmit={handleCommentSubmit} />
          ) : (
            <button onClick={handleCommentClick}>Add a Comment</button>
          )}
          <button><BsBookmarkPlus /></button>
        </div>
        {post.comments.length > 0 && <div className='comments'>
          Comments:
          <br/>
              {post.comments.map((comment, index) => (
                <div key={index}>{comment}</div>
              ))}

        </div>
        }

      </section>
    </>
  )
}

export default Post;