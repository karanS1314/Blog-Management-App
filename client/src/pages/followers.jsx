import React , { useEffect, useState } from 'react';
import '../components/Followers/Followers.css'; // Import your CSS file for styling
import Navbar from '../components/Navbar';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Follower() {
	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};

	const navigate = useNavigate();
	// Fake follower data
	const [users , setUsers] = useState([]);
	useEffect(()=>{
		if(!jwtToken)
		{
		navigate("/signin");
		}	
		axios.get('http://127.0.0.1:3000/author/showAll',{headers})
		.then((response) => {
			setUsers(response.data);
			console.log(response.data);
		})
		.catch((error) => {
			console.error('Error fetching posts:', error);
		});

	},[])
  return (
	<>
	<Navbar/>
    <div className="followers-container">
      {users.map(follower => (
        <div key={follower.id} className="follower-item">
          <div className="serial-number">{follower.id}</div>
          <i class="fa fa-user fa-lg"></i>
          <div className="follower-details">
            <div className="name">{follower.name}</div>
          </div>
        </div>
      ))}
    </div>
	</>
  );
}

export default Follower;
