import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { postArray } from "../components/Main/Feed/Data";
import Navbar from '../components/Navbar';
import {AiOutlineLike} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {BsBookmarkPlus} from 'react-icons/bs';
import Comment from './commentForm';



const Post = () => {
    const {id} = useParams();
    // console.log(id);
    const post = postArray.find(e => e.id == id);

    const [posts,setPosts] = useState(postArray);
    const [count,setCount] = useState(0);

    const updateLikes = () =>{
      setCount((precount) => precount+1);
      // console.log(count);
      if(count % 2 ==1){
        post.likes = post.likes-1;
      }
      else{
        post.likes = post.likes + 1;
      }
      console.log(postArray.find(e => e.id == id).likes);
      // postArray.map((item) =>{
      //   if(item.id == id){
      //    return  {...item,likes: post.likes};
      //   }
      // })
      // const index = posts.findIndex((post) => post.id = id);
      // const updatedPost = {...posts[index], likes: 10};
      // const newPosts = [...posts];
      // newPosts[index] = updatedPost;
      // setPosts(newPosts);
    }
  
  return (
    <>
      <Navbar />
      <section>
        <div>
          {post.title}
        </div>
        <div>
          {post.description}
        </div>
        <div>
          Topics
        </div>
        <div>
          <span onClick={updateLikes}><AiOutlineLike />{post.likes}</span>
          <Comment />
          <button><BsBookmarkPlus /></button>
        </div>

      </section>
    </>
  )
}

export default Post;