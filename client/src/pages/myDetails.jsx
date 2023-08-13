import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {Topic , LastWrapper, EButton,InputWrapper , Button , Input , Image , Container, Wrapper1, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date, Name , Email , Gender , Followers , Following , FollowWrapper} from "../components/Profile/ProfileElements";
import Navbar from '../components/Navbar';
import profileImg from "../images/profile.webp"
import {useNavigate} from 'react-router-dom';
import { FaThumbsUp, FaRegComment, FaRegEdit,FaPen ,FaTrash} from "react-icons/fa";
import axios from 'axios';

const MyDetails = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [aboutText, setAboutText] = useState('');
    const [posts, setPosts] = useState([]);
    const [authorDetails,setAuthorDetails]=useState('');
    const [userArr , setUserArray]=useState([]);
    const {id} = useParams();
	const [followers , setFollowers] = useState([]);
	const [following , setFollowing] = useState([]);
	const [showInput , setShowInput] = useState(0);
	const navigate = useNavigate();

	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};

	
	useEffect(()=>{
		console.log(headers);
        axios.get('http://127.0.0.1:3000/author/my/details',{headers})
        .then((response) => {
            setAuthorDetails(response.data);
            setAboutText(response.data.about)
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
        .then((response) => {
            setPosts(response.data);
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

	},[])

    const handleDelete = (postId) => {
        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`,{headers})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);

        });
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
        .then((response) => {
            setPosts(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);

        });
    }
    

	const searchUser = () => {
        console.log(userArr);
		let uname = document.getElementById("searchUsers");
		// console.log(input.value);
		const uid = userArr.findIndex((user) => user.name === uname.value);
		// console.log(userArr[userIndex].id);
		if (uid !== -1) {
			navigate("/profile/" + uid)
		}
	}

    const toggleAdd = () => {
		setShowInput(1 - showInput);
	}
    
    const RenderFeed = () =>{
		return (
			<>
			{posts.map((item) => {
				if(authorDetails.username == `${item.author}`){
					return (
					<PostWrapper key={item.id}>
						<Starting>
							<Heading>{item.author}</Heading>
							<ReadTime>{item.minReadTime} read</ReadTime>
                            <Topic>{item.topic}</Topic>
						</Starting>
						<hr />
						<Title to={`/post/${item.id}`} >
							{item.title}
						</Title>
						<Description>
							{item.description.substring(0,100)}...
						</Description>
						<Ending>
							<Likes>{item.likes} <FaThumbsUp style={{margin: -4 }}/></Likes>
							<Comments>{item.comments.length} <FaRegComment style={{margin: -4 }}/></Comments>
							<Date>Published on: {item.date}</Date>
						</Ending>
						<LastWrapper>
							<EButton><FaRegEdit/></EButton>
							<EButton><FaTrash/></EButton>
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
				<Name>{authorDetails.name}</Name>
				<Email>{authorDetails.email}</Email>
				<FollowWrapper>
					<Followers>Followers</Followers>
					<Following>Following</Following>
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
					<Button>Add article</Button>
				</InputWrapper>
				<Title>My Posts</Title>
				<RenderFeed/>
			</Wrapper2>
		</Container>
		</>
	)
}

export default MyDetails