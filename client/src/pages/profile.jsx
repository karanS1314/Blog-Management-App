import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { postArr } from "../components/Main/Feed/Data";
import { userArr } from "../components/User/UserData";
import {Topic , LastWrapper, EButton,InputWrapper , Button , Input , Image , Container, Wrapper1, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date, Name , Email , Gender , Followers , Following , FollowWrapper} from "../components/Profile/ProfileElements";
import Navbar from '../components/Navbar';
import profileImg from "../images/profile.webp"
import {useNavigate} from 'react-router-dom';
import { FaThumbsUp, FaRegComment, FaRegEdit,FaPen ,FaTrash} from "react-icons/fa";

const Post = () => {
	
	const [allPosts, setAllPosts] = useState(postArr);
    const {id} = useParams();
	const user = userArr.find(e => e.id == id);
	const [followers , setFollowers] = useState([]);
	const [following , setFollowing] = useState([]);
	const [showInput , setShowInput] = useState(0);
	const navigate = useNavigate();

	const toFollower = () =>{
		navigate("/");
	}
	const toFollowing = () =>{
		navigate("/");
	}
	const toggleAdd = () => {
		setShowInput(1 - showInput);
	}
	const saveBtn = () => {
		const title = document.getElementById("title");
		const description = document.getElementById("description");
		const topic = document.getElementById("topic");
		let date = new window.Date();
		if (title.value == "" || description.value == "") {
			alert("Article cannot have empty title / description!");
			return;
		} 
		const wordsPerMinute = 200; // Average case.
		let result;
		let textLength = description.value.split(" ").length; // Split by words
		if(textLength > 0){
		  let value = Math.ceil(textLength / wordsPerMinute);
		  result = `~${value} min`;
		}
		const article = {
			id: window.Date.now(),
			description: description.value,
			title: title.value,
			likes:"",
			comments:"",
			minReadTime:result,
			date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
			author: user.username,
			topic: topic.value,
		}
		title.value="";
		description.value ="";
		topic.value="";
		addArticle(article);
		window.location.reload();
	}
	const addArticle = (article) =>{
		allPosts.push(article);
		localStorage.setItem("posts" , JSON.stringify(allPosts));
	}
	const savePost = (id , description) =>{
		const taskIndex = allPosts.findIndex((task) => task.id === id);
		if (taskIndex !== -1) {
			allPosts[taskIndex].description = description;
		}
		window.localStorage.setItem("posts" , JSON.stringify(allPosts))
	}
	const edit = (id) => {
		// console.log(id);
		const post = allPosts.find(obj => {
			return obj.id === id;
		  });
		const eInputContainer = document.getElementById("ed");
		eInputContainer.classList.add("input-container");

		const eTextContainer = document.createElement("div");
		eTextContainer.classList.add("text-container");

		const eInputText = document.createElement("input");
		eInputText.type = "text";
		eInputText.value = post.description;
		eTextContainer.appendChild(eInputText);
		const editsavebtn = document.createElement("button");
		editsavebtn.innerHTML = "Save";
		editsavebtn.classList.add("edit-save-button");
		editsavebtn.onclick = () => {
			savePost(
				id,
				eInputText.value,
			);
			window.location.reload();
		};
		eInputContainer.append(eTextContainer);
		eInputContainer.append(editsavebtn);
	}
	const deletePost = (id) => {
		// console.log(id);
		setAllPosts(allPosts.filter((task) => task.id != id));
		window.localStorage.setItem("posts" , JSON.stringify(allPosts));
	}
	useEffect(() => {
		if(!window.localStorage.getItem("demo_user")){
			navigate("/signin");
		}
		if(window.localStorage.getItem("posts")){
			setAllPosts(JSON.parse(window.localStorage.getItem("posts")));
		}
    },[]);
	const searchUser = () => {
		let uname = document.getElementById("searchUsers");
		// console.log(input.value);
		const userIndex = userArr.findIndex((user) => user.username === uname.value);
		// console.log(userArr[userIndex].id);
		if (userIndex !== -1) {
			const uid = userArr[userIndex].id
			navigate("/profile/" + uid)
		}
	}
    const RenderFeed = () =>{
		return (
			<>
			{allPosts.map((item) => {
				if(user.username == `${item.author}`){
					return (
					<PostWrapper key={item.id}>
						<Starting>
							<Heading>{item.author}</Heading>
							<ReadTime>{item.minReadTime} read</ReadTime>
                            <Topic>{item.topic}</Topic>
						</Starting>
						<hr />
						<Title to={`post/${item.id}`} >
							{item.title}
						</Title>
						<Description>
							{item.description.substring(0,100)}...
						</Description>
						<Ending>
							<Likes>{item.likes} <FaThumbsUp style={{margin: -4 }}/></Likes>
							<Comments>{item.comments} <FaRegComment style={{margin: -4 }}/></Comments>
							<Date>Published on: {item.date}</Date>
						</Ending>
						<LastWrapper>
							<EButton onClick={()=>edit(item.id)}><FaRegEdit/></EButton>
							<EButton onClick={()=>deletePost(item.id)}><FaTrash/></EButton>
							<div id="ed"></div>
						</LastWrapper>
					</PostWrapper>
					);
				}
			})}
			</>
		)
	}
	return (
		<>
		<Navbar/>
		<Container>
			<Wrapper1>
				<Image src={profileImg}></Image>
				<Name>{user.username}</Name>
				<Email>{user.email}</Email>
				<FollowWrapper>
					<Followers onClick={toFollower}>Followers</Followers>
					<Following onClick={toFollowing}>Following</Following>
				</FollowWrapper>
				<EButton onClick={toggleAdd}><FaPen/> Write New</EButton>
				<hr />
				<input type='text' id="searchUsers" placeholder='Search Users'></input>
				<button onClick={searchUser}>search</button>
			</Wrapper1>
			<Wrapper2>
				<InputWrapper show={showInput}>
					<Input id="title" placeholder="Title"></Input>
					<Input id="description" placeholder="Description"></Input>
					<Input id="topic" placeholder="Topic"></Input>
					<Button onClick={saveBtn}>Add article</Button>
				</InputWrapper>
				<Title>My Posts</Title>
				<RenderFeed/>
			</Wrapper2>
		</Container>
		</>
	)
}

export default Post