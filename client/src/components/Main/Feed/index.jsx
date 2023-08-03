import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { postArray } from "./Data";

const Feed = () => {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate("/");
  };
  return (
    <>
        {postArray.map((item) => {
        return (
          <li className="card p-3 mb-2">
            <div className="card-body">
              <p className="card-text">{item.title}</p>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Feed;
