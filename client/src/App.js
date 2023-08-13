import { Route, Routes } from "react-router-dom";
import Main from "./pages";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Logout from "./pages/logout";
import Post from "./pages/post";
import Profile from "./pages/profile";
import { useReducer, React, useEffect } from "react";
import MyDetails from "./pages/myDetails";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signin" exact element={<Signin />} />
      <Route path="/logout" exact element={<Logout />} />
      <Route path="/post/:id" exact element={<Post />} />
      <Route path="/profile/:uid" exact element={<Profile />} />
      <Route path="/myDetails" exact element={<MyDetails />} />
    </Routes>
  );
};
function App() {
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
