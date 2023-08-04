
import { useNavigate } from "react-router-dom";
import { postArray } from "./Data";
import {Container, Wrapper1, SearchInput, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date} from "./FeedElements";
import { useEffect , useState} from "react";
const Feed = () => {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate("/");
  };

  const [input , setInput] = useState("");

  const search = () => {
    setInput(document.getElementById("searchbar").value.toLowerCase());
  }
  const RenderFeed = () =>{
    if(input !== ""){
        return (
            <>
            {postArray.map((item) => {
                console.log(input);
                if(item.title.toLowerCase().includes(input) ||
                 item.description.toLowerCase().includes(input) || 
                 item.author.toLowerCase().includes(input)){
                    return (
                        <PostWrapper key={item.id}>
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
                }
            })}
            </>
        )
    }
    else{
        return (
            <>
            {postArray.map((item) => {
                return (
                <PostWrapper key={item.id}>
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
            </>
        )
    }
    
  }
  return (
    <>
    <Container>
        <Wrapper1>
            <SearchInput type="text" id = "searchbar" onKeyUp={search} placeholder="Search articles"></SearchInput>
        </Wrapper1>
        <Wrapper2>
            <RenderFeed/>
        </Wrapper2>
    </Container>  
    </>
  );
};

export default Feed;
