import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {SearchInput , Topic , LastWrapper, EButton,InputWrapper , Button , Input , Image , Container, Wrapper1, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date, Name , Email , Gender , Followers , Following , FollowWrapper} from "../components/Profile/ProfileElements";
import Navbar from '../components/Navbar';
import profileImg from "../images/profile.webp"
import {useNavigate} from 'react-router-dom';
import { FaEye , FaThumbsUp, FaRegComment, FaRegEdit,FaPen ,FaTrash} from "react-icons/fa";
import axios from 'axios';

const Profile = () => {
	const { uid } = useParams();
	const [userDetails , setUserDetails]=useState('');
	const [userArr , setUserArray]=useState([]);
	const [posts , setPosts] = useState([]);
	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};

	useEffect(()=>{
		axios.get(`http://127.0.0.1:3000/get/post/author/${uid}`)
		.then((response) => {
		  setPosts(response.data);
		  console.log(response.data);
		})
		.catch((error) => {
		  console.error('Error fetching posts:', error);
  
		});
		axios.get(`http://127.0.0.1:3000/author/details/${uid}`)
		.then((response) => {
			setUserDetails(response.data);
			console.log(response.data);
		})
		.catch((error) => {
			console.error('Error fetching posts:', error);

		});
		axios.get('http://127.0.0.1:3000/author/showAll',{headers})
        .then((response) => {
            setUserArray(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });

	},[uid])
	const [followers , setFollowers] = useState([]);
	const [following , setFollowing] = useState([]);
	const navigate = useNavigate();

	const toFollower = () =>{
		navigate("/");
	}
	const toFollowing = () =>{
		navigate("/");
	}

	const searchUser = () => {
		let uname = document.getElementById("searchUsers");
		console.log(userArr);
		const sid = userArr.findIndex((user) => user.name === uname.value) + 1;
		console.log(sid);
		if (sid !== 0) {
			navigate("/profile/" + sid)
		}
	}
    const RenderFeed = () =>{
		return (
			<>
			{posts.map((item) => {
				return (
				<PostWrapper key={item.id}>
					<Starting>
						<Heading>{item.author_name}</Heading>
						<ReadTime>{item.reading_time} read</ReadTime>
						<Topic>{item.topic}</Topic>
					</Starting>
					<hr />
					<Title to={`/post/${item.id}`} >
						{item.title}
					</Title>
					<Description>
						{item.text.substring(0,100)}...
					</Description>
					<img style={{width: "200px"}} src={item.image} alt={item.title} />
					<Ending>
						<Likes>{item.comments_count + item.likes_count + 100 + 30*item.id} <FaEye style={{margin: -4 }}/></Likes>
						<Likes>{item.likes_count} <FaThumbsUp style={{margin: -4 }}/></Likes>
						<Comments>{item.comments_count} <FaRegComment style={{margin: -4 }}/></Comments>
						<Date>Published on: 2023-08-13</Date>
					</Ending>
				</PostWrapper>
				);
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
				<Name>{userDetails.name}</Name>
				<Email>{userDetails.email}</Email>
				<FollowWrapper>
					<Followers onClick={() => {navigate("/myFollowers")}}>Followers</Followers>
					<Following onClick={() => {navigate("/myFollowers")}}>Following</Following>
				</FollowWrapper>
				<hr />
				<SearchInput type='text' id="searchUsers" placeholder='Search Users'></SearchInput>
				<Button green={false} onClick={searchUser}>search</Button>
			</Wrapper1>
			<Wrapper2>
				<Title>{userDetails.name}'s Posts</Title>
				<RenderFeed/>
			</Wrapper2>
		</Container>
		</>
	)
}

export default Profile