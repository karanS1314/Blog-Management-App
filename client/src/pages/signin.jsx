import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import Navbar from "../components/Navbar/index";
import {Button} from "../components/Form/FormElements";
import axios from 'axios';

const Signin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) =>{
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await axios.post('http://127.0.0.1:3000/author/login', formData);
      // Assuming the API responds with a success message or user data
      console.log('Sign-up successful:', response.data);
      // Reset the form after successful sign-up
      setFormData({
        email: '',
        password: '',
      });
      const jwtToken = response.data.token;
      localStorage.setItem('jwtToken', jwtToken);
      navigate('/');
    } catch (error) {
      // Handle any errors that occur during sign-up
      console.error('Sign-up failed:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return (
      <>
        <Navbar />
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
            <form method="POST">
                        <h3>
                            Sign In
                        </h3>
                        <label htmlFor="username">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="Enter password"
                                className={`form-input }`}
                                placeholder="email"
                            />
                        <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="Enter password"
                                className={`form-input }`}
                                placeholder="password"
                            />
                        <Button
                            onClick={loginUser}  type='submit'
                        >
                            Sign in
                        </Button>
                    </form>
        </div>
      </>
    

  )
}

export default Signin