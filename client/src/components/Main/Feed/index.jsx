
import {Link } from "react-router-dom";
import {RTopic , Topic, Container, Wrapper1, SearchInput, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date} from "./FeedElements";
import {useState , useEffect} from "react";
import { FaEye, FaThumbsUp, FaRegComment } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Feed = () => {
    const [postArr , setpostArr] = useState([]);
    const [showTop , setShowTop] = useState(false);
    const [rTopic , setRTopic] = useState("");
    const [input , setInput] = useState("");
    useEffect(() => {
        if(!showTop){
            axios.get('http://127.0.0.1:3000/posts/all')
            .then((response) => {
                setpostArr(response.data);
                console.log(response.data);
            })
            .catch((error) => {
            console.error('Error fetching posts:', error);

            });
        }
        else{
            axios.get('http://127.0.0.1:3000/get/topPosts')
            .then((response) => {
                setpostArr(response.data);
                console.log(response.data);
                
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
        }
    }, [showTop , input , rTopic]);
  const search = () => {
    setInput(document.getElementById("searchbar").value.toLowerCase());
  }
  const toggleTopPost = () => {
    const isChecked = document.getElementById("toppost").checked;
    console.log(isChecked);
    if(isChecked){
        setShowTop(true);    
    }
    else{
        setShowTop(false);
    }
  }
  const RenderFeed = () =>{
    let postAr = postArr;
    if(input !== ""){
        postAr = postArr.filter(item => item.title.toLowerCase().includes(input) ||
        item.text.toLowerCase().includes(input) || 
        item.author_name.toLowerCase().includes(input));
    }
    if(rTopic !== ""){
        postAr = postArr.filter(item => item.topic === rTopic);
    }
    return (
        <>
        {postAr.map((item) => {
            return (
                <PostWrapper key={item.id}>
                    <Starting>
                        <Heading>{item.author_name}</Heading>
                        <ReadTime>~{item.id} min read</ReadTime>
                        <Topic>{item.topic}</Topic>
                    </Starting>
                    <hr />
                    <Title to={`/post/${item.id}`} >
                        {item.title}
                    </Title>
                    <Description>
                        {item.text.substring(0,100)}...
                    </Description>
                    <img style={{width: "200px"}} src={item.image} alt={item.title} />
                    <Ending>
						<Likes>{item.comments_count + item.likes_count + 100 + 30*item.id} <FaEye style={{margin: -4 }}/></Likes>
                        <Likes>{item.likes_count} <FaThumbsUp style={{margin: -4 }}/></Likes>
                        <Comments>{item.comments_count} <FaRegComment style={{margin: -4 }}/></Comments>
                        <Date>Published on: 2023-08-13</Date>
                    </Ending>
                </PostWrapper>
            );
        })}
        </>
    )
  }
  return (
    <>
    <Container>
        <Wrapper1>
            <SearchInput type="text" id = "searchbar" onKeyUp={search} placeholder="Search articles"></SearchInput>
            <div>
                <div>
                    <hr />
                    <h5>View Top Posts</h5>
                    <input onClick={toggleTopPost} type="checkbox" id="toppost"/>
                    <hr />
                    <h5>Recommended Topics</h5>
                    <div>
                    {postArr.map((item) => {
                        return (
                            <RTopic onClick={() => setRTopic(item.topic)}>{item.topic}</RTopic>
                        );
                    })}
                    </div>
                    <hr />
                    <button style={{cursor:"pointer"}}onClick={() => setRTopic("")} >Show All Posts</button>
                </div>
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
