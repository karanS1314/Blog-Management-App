
import {Link } from "react-router-dom";
import {Container, Wrapper1, SearchInput, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date} from "./FeedElements";
import {useState , useEffect} from "react";

const Feed = () => {

  const [input , setInput] = useState("");
  const [postArray , setPostArray] = useState([]);
  const search = () => {
    setInput(document.getElementById("searchbar").value.toLowerCase());
  }
  useEffect(() => {
    if(window.localStorage.getItem("posts")){
        setPostArray(JSON.parse(window.localStorage.getItem("posts")));
    }
  },[]);
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
                        <PostWrapper key={item.id} >
                        <hr />
                            <Starting>
                                <Heading>{item.author}</Heading>
                                <ReadTime>{item.minReadTime}</ReadTime>
                            </Starting>
                            <Title to={`post/${item.id}`} >
                                {item.title}
                            </Title>
                            <Description>
                                {item.description}
                            </Description>
                            <Ending>
                                <Likes>{item.likes}</Likes>
                                <Comments>{item.comments}</Comments>
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
                    <Title to={`post/${item.id}`} >
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
