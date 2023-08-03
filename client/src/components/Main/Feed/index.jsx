import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { postArray } from "./Data";
import {Wrapper, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date} from "./FeedElements";
const Feed = () => {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate("/");
  };
  return (
    <>
        <Wrapper>
        {postArray.map((item) => {
            return (
            <PostWrapper>
            <hr />
                <Starting>
                    <Heading>{item.author}</Heading>
                    <ReadTime>{item.minReadTime}</ReadTime>
                </Starting>
                <Title>
                    {item.title}
                </Title>
                <Description>
                    {item.description}
                </Description>
                <Ending>
                    <Likes>{item.likes}</Likes>
                    <Comments>{item.comments}</Comments>
                    {/* <Date>{item.date}</Date> */}
                </Ending>
            </PostWrapper>
            );
        })}
        </Wrapper>
        
    </>
  );
};

export default Feed;
