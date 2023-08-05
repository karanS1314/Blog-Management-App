
import {Link } from "react-router-dom";
import {Topic, Container, Wrapper1, SearchInput, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date} from "./FeedElements";
import {useState , useEffect} from "react";
import { FaThumbsUp, FaRegComment } from "react-icons/fa6";
import { postArr } from "./Data";
const Feed = () => {

  const [input , setInput] = useState("");
  const [postArray , setPostArray] = useState(postArr);
  const search = () => {
    setInput(document.getElementById("searchbar").value.toLowerCase());
  }
  useEffect(() => {
    if(window.localStorage.getItem("posts")){
        setPostArray(JSON.parse(window.localStorage.getItem("posts")));
    }
  },[]);

  const compareLikes = (postA, postB) => {
    return postB.likes - postA.likes;
  };
  const compareComments = (postA, postB) => {
    return postB.comments.length - postA.comments.length;
  };
  const sortby = () => {
    const sort = document.getElementById("sort").value;
    console.log(sort);
    if(sort == 1){
    console.log(postArray);

        postArray.sort(compareLikes);
    }
    else if(sort == 2){
    console.log(postArray);

        postArray.sort(compareComments);
    }
    window.localStorage.setItem("posts",JSON.stringify(postArray));
    window.location.reload();
    // RenderFeed();
  }

  const RenderFeed = () =>{
    if(input !== ""){
        return (
            <>
            {postArray.map((item) => {
                // console.log(input);
                if(item.title.toLowerCase().includes(input) ||
                 item.description.toLowerCase().includes(input) || 
                 item.author.toLowerCase().includes(input)){
                    return (
                        <PostWrapper key={item.id} >
                            <Starting>
                                <Heading>Author: {item.author}</Heading>
                                <ReadTime>{item.minReadTime} read</ReadTime>
                                <Topic>{item.topic}</Topic>
                            </Starting>
                            
                        <hr />
                            <Title to={`post/${item.id}`} >
                                {item.title}
                            </Title>
                            <Description>
                                {item.description.substring(0,100)}...
                            </Description>
                            <Ending>
                                <Likes>{item.likes} <FaThumbsUp/></Likes>
                                <Comments>{item.comments.length} <FaRegComment/></Comments>
                                <Date>Published on: {item.date}</Date>
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
                    <Starting>
                        <Heading>Author: {item.author}</Heading>
                        <ReadTime>{item.minReadTime} read</ReadTime>
                        <Topic>{item.topic}</Topic>
                    </Starting>
                        <hr />
                    <Title to={`post/${item.id}`} >
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
            <div>
                <label htmlFor="sort">Sort by</label>
                <select name="sort" id="sort">
                    <option value="1">Most Likes</option>
                    <option value="2">Most Commented</option>
                </select>
                <button id="sortBtn" onClick={sortby}>Sort</button>
            </div>
        </Wrapper1>
        <Wrapper2>
            <RenderFeed/>
        </Wrapper2>
    </Container>  
    </>
  );
};

export default Feed;
