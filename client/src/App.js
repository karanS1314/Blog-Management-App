import { Route, Routes } from "react-router-dom";
import Main from "./pages";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Logout from "./pages/logout";
import { createContext, useReducer, React, useEffect } from "react";
import { reducer, initialState } from "../src/reducer/useReducer";

export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signin" exact element={<Signin />} />
      <Route path="/logout" exact element={<Logout />} />
    </Routes>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("STATE", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
