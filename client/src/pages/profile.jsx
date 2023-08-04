import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { postArray } from "../components/Main/Feed/Data";
import {EditButton,InputWrapper , Button , Input , Image , Container, Wrapper1, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date, Name , Email , Gender , Followers , Following , FollowWrapper} from "../components/Profile/ProfileElements";
import Navbar from '../components/Navbar';
import profileImg from "../images/profile.webp"
import {useNavigate} from 'react-router-dom';

const Post = () => {
	
	const [allPosts, setAllPosts] = useState([]);
    const {id} = useParams();
	const [user , setUser] = useState({});
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
		let date = new window.Date();
		if (title.value == "" || description.value == "") {
			alert("Article cannot have empty title / description!");
			return;
		}
		const article = {
			id: window.Date.now(),
			description: description.value,
			title: title.value,
			likes:"",
			comments:"",
			minReadTime:"",
			date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
			author: user.name
		}
		title.value="";
		description.value ="";
		addArticle(article);
	}
	const addArticle = (article) =>{
		allPosts.push(article);
		localStorage.setItem("posts" , JSON.stringify(allPosts));
	}
	useEffect(() => {
		if(window.localStorage.getItem("posts")){
			setAllPosts(JSON.parse(window.localStorage.getItem("posts")));
		}
        setUser({
            name: "akash",
            email: "karan@gmail.com",
			gender: "male"
        });
    },[allPosts]);
    const RenderFeed = () =>{
		return (
			<>
			{allPosts.map((item) => {
				if(user.name == `${item.author}`){
					return (
					<PostWrapper key={item.id}>
					<hr />
						<Starting>
							<Heading>{item.author}</Heading>
							<ReadTime>{item.minReadTime}</ReadTime>
						</Starting>
						<Title to={`post/${item.id}`} >
							{item.title}
						</Title>
						<Description>
							{item.description}
						</Description>
						<Ending>
							<Likes>{item.likes}</Likes>
							<Comments>{item.comments}</Comments>
							<Date>{item.date}</Date>
						</Ending>
						<EditButton>Edit</EditButton>
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
				<Name>{user.name}</Name>
				<Email>{user.email}</Email>
				<FollowWrapper>
					<Followers onClick={toFollower}>Followers</Followers>
					<Following onClick={toFollowing}>Following</Following>
				</FollowWrapper>
				<Title onClick={toggleAdd}>Add new article</Title>
			</Wrapper1>
			<Wrapper2>
				<InputWrapper show={showInput}>
					<Input id="title" placeholder="Title"></Input>
					<Input id="description" placeholder="Description"></Input>
					<Input id="topics" placeholder="Comma(,) seperated topics"></Input>
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