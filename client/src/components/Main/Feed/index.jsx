
import {Link } from "react-router-dom";
import {Topic, Container, Wrapper1, SearchInput, Wrapper2, PostWrapper , Starting  ,Heading , ReadTime,  Title , Description , Ending , Likes , Comments , Date} from "./FeedElements";
import {useState , useEffect} from "react";
import { FaThumbsUp, FaRegComment } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Feed = () => {
    const [postArr , setpostArr] = useState([]);
    const [showTop , setShowTop] = useState(false);
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
    }, [showTop]);

  const [input , setInput] = useState("");
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
    if(input !== ""){
        return (
            <>
            {postArr.map((item) => {
                // console.log(input);
                if(item.title.toLowerCase().includes(input) ||
                 item.text.toLowerCase().includes(input) || 
                 item.author_name.toLowerCase().includes(input)){
                    return (
                        <PostWrapper key={item.id}>
                            <Starting>
                                <Heading>{item.author_name}</Heading>
                                <ReadTime>{item.reading_time} read</ReadTime>
                                <Topic>{item.topic}</Topic>
                            </Starting>
                            <hr />
                            <Title to={`/post/${item.id}`} >
                                {item.title}
                            </Title>
                            <Description>
                                {item.text.substring(0,100)}...
                            </Description>
                            <Ending>
                                <Likes>{item.likes_count} <FaThumbsUp style={{margin: -4 }}/></Likes>
                                <Comments>{item.comments_count} <FaRegComment style={{margin: -4 }}/></Comments>
                                <Date>Published on: {item.published_at}</Date>
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
            {postArr.map((item) => {
                return (
                <PostWrapper key={item.id}>
					<Starting>
						<Heading>{item.author_name}</Heading>
						<ReadTime>{item.reading_time} read</ReadTime>
						<Topic>{item.topic}</Topic>
					</Starting>
					<hr />
					<Title to={`/post/${item.id}`} >
						{item.title}
					</Title>
					<Description>
						{item.text.substring(0,100)}...
					</Description>
					<Ending>
						<Likes>{item.likes_count} <FaThumbsUp style={{margin: -4 }}/></Likes>
						<Comments>{item.comments_count} <FaRegComment style={{margin: -4 }}/></Comments>
						<Date>Published on: {item.published_at}</Date>
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
                {/* <label htmlFor="sort">Sort by</label>
                <select name="sort" id="sort">
                    <option value="1">Most Likes</option>
                    <option value="2">Most Commented</option>
                </select>
                <button id="sortBtn" onClick={sortby}>Sort</button> */}
                <div>
                <label>View Top Posts</label>
                <input onClick={toggleTopPost} type="checkbox" id="toppost"/>
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
