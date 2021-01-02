import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase/firebase';
import firebase from 'firebase';
function Post({postId,username, user, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() =>{
        let unsubscribe;
        if (postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc)=>doc.data()));
            });
        }
        return ()=>{
            unsubscribe();
        };
      },[postId]); 
    
    const postComment = (event) =>{
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt='YG' src="1.jpg"></Avatar>
                <h3>{username}</h3>
            </div>
            
            <img className ="post__image" src={imageUrl} alt=""/>
            <h4 className="post__text"><strong>{username}</strong>   {caption}</h4>

            <div className="post__comments">
            {
                comments.map((comment) => (
                    <p className="post__comment" >
                        <b>{comment.username}</b> {comment.text}
                    </p>
                ))
            }
            </div>

            {user && (<form className="post__commentBox">
                <input className="post__input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e)=> setComment(e.target.value)} />
                <button className="post__button" type="submit" disabled={!comment} onClick={postComment}>
                    Post
                </button>
            </form>
            )}
        </div>
    )
}

export default Post
