import React,{useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase/firebase'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] =  useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [user,setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe =  auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //로그인된 상태면
        // console.log(authUser);
        setUser(authUser);
      }
      else{
        //아니면
        setUser(null);
      }
    })

    return () =>{
      //perform some cleanup actions
      unsubscribe()
    }
  },[user,username]);

  //useEffect Runs a piece of code based on a specific condition
  useEffect(() =>{
    //this is where the code runs
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=> {
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    }) // snapshot -> 데이터베이스의 값이 바뀔때마다 
    //every time a newpost is addded, this code fires...
  },[]); // 두번째 인자에 값을 넣으면 실행될때마다 값을 바꿔준다.


  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message))
    setOpen(false);
  }

  const signIn = (event) =>{
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error.message))
    setOpenSignIn(false);
  }
  
  return (
    <div className="App">
      

        <Modal open={open}   onClose={()=> setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" >
            <center>
              <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </center>
            <Input placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="email"
              type="text"
              value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn}   onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" >
            <center>
              <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </center>
            <Input placeholder="email"
              type="text"
              value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>  
      ):(
      <div className="app__loginContainer">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
      </div>)
      }
      </div>
      
      <div className="app__posts" >
        <div className="app__postLeft">
          {
          posts.map(({id,post}) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
      {/* <div className="app__postRight">
                <InstagramEmbed
            url='https://www.instagram.com/p/CCDVHKvhXIn/?utm_source=ig_web_copy_link'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
      </div> */}
      </div>
      
    
   {user?.displayName ? 
      (<ImageUpload username={user.displayName} />)
      :
      (<h3> Sorry you need to login to upload</h3>)}
      
      
    </div>
  );
}

export default App;
