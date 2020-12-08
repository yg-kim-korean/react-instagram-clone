import React,{useState} from 'react';
import './App.css';
import Post from './Post';
function App() {
  const [posts, setPosts] = useState([
    {
    username:"YG",
    caption:"wow nice u-jo!",
    imageUrl:"https://sports-phinf.pstatic.net/20201006_204/1601968337774YF4CX_JPEG/%BD%BA%C6%E4%BC%C8A_670x250.jpg"
  },
    {
      username:"KTYG",
      caption:"wow nice Messi!!",
      imageUrl:"https://imgnews.pstatic.net/image/477/2020/12/08/0000275909_001_20201208130634974.jpg?type=w647"
    },
    {
      username:"KTYG",
      caption:"wow nice Sonny!!",
      imageUrl:"https://imgnews.pstatic.net/image/413/2020/12/08/0000109958_001_20201208145921933.jpg?type=w647"
    }
  ]);
  
  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
      </div>
      <h1>React</h1>  
    {
      posts.map(post => (
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
   
      
      
    </div>
  );
}

export default App;
