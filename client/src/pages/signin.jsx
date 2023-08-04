import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import { UserContext } from '../App';
import { Formik } from "formik";
import * as yup from "yup";
import Navbar from "../components/Navbar/index";
import {Button} from "../components/Form/FormElements"
const Signin = () => {
  const {state , dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const loginUser = async (e) =>{
    e.preventDefault();

    const res = await fetch("/api/signin", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email, password
        })
      })
    
      const data = res.json();
      if(res.status === 400 || !data){
          window.alert("Invalid credentials");
      }
      else{
        dispatch({type: "USER", payload: true});
        window.alert("Login successful");
        navigate("/home");
      }
  }
  const SignInSchema = yup.object().shape({
    username: yup.string().required("Username is Required"),
    password: yup.string().required("Password Is Required"),
});
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
      <>
        <Navbar />
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log({ values });
                    // Add submit logic here
                    localStorage.setItem("demo_user", true);
                    setSubmitting(false);
                    navigate("/");
                }}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    setValues,
                }) => (
                    <form
                        method="POST"
                    >
                        <h3>
                            Sign In
                        </h3>
                        <label htmlFor="username">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleBlur}
                                autoComplete="email"
                                className={`form-input ${
                                    touched.username &&
                                    !!errors.username &&
                                    "border-red-700"
                                }`}
                                placeholder="Enter valid email"
                            />
                            {touched.username && !!errors.username && (
                                <span className="text-xs text-red-700">
                                    {errors.username}
                                </span>
                            )}
                        <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handleBlur}
                                autoComplete="Enter password"
                                className={`form-input ${
                                    touched.password &&
                                    !!errors.password &&
                                    "border border-red-700"
                                }`}
                                placeholder="password"
                            />
                            {touched.password && !!errors.password && (
                                <span className="text-xs text-red-700">
                                    {errors.password}
                                </span>
                            )}
                        <Button
                            onClick={loginUser}  type='submit'
                        >
                            Sign in
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
      </>
    

  )
}

export default Signin