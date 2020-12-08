import React,{useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase'
function App() {
  const [posts, setPosts] = useState([]);
  

  //useEffect Runs a piece of code based on a specific condition
  useEffect(() =>{
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot=> {
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    }) // snapshot -> 데이터베이스의 값이 바뀔때마다 
    //every time a newpost is addded, this code fires...
  },[]); // 두번째 인자에 값을 넣으면 실행될때마다 값을 바꿔준다.
  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
      </div>
      <h1>React</h1>  
    {
      posts.map(({id,post}) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
   
      
      
    </div>
  );
}

export default App;
