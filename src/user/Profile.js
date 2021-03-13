import React, { Fragment, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { isAuthenticated} from '../auth'
import { fetchUser} from './apiUser'
import {listByUser} from '../post/apiPost'
import DeleteUser from './DeleteUser'
import Post from '../post/Post'
import Spinner from '../components/Spinner'
import avatar from '../images/avatar.png'


const Profile = ({match, history}) => {
  const [user, setUser] = useState('')
  const [ posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const userId = match.params.userId
  

  const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` :  avatar

  const loadPosts = (userId) => {
    const token = isAuthenticated().token
    listByUser(userId, token)
    .then(data => {
      if(data.error)console.log(data.error)
      else{
        setPosts(data)
        setLoading(false)
      }
    })
  }


  useEffect(() => {
    setLoading(true)
    const token = isAuthenticated().token
    fetchUser(userId,token)
    .then(data => {
        if(data.error || data.visible === 0){
            history.push('/users')
        }else{
            setUser(data)
            loadPosts(data._id)
        }
    })
}, [userId])


const renderProfile = () =>  (
  <Fragment>
  <div className="row">
    <div className="col-md-4" >
        <img className="img-fluid z-depth-1 rounded-circle ml-5 mb-5" src={photoUrl}
        onError={ i => i.target.src = `${avatar}`}
        style={{width: "10rem"}} alt={user.name}/> 
    </div>
    <div className="col-md-8 mb-5">
    <div className="lead mt-2">
      <p className="font-italic"><strong>{user.name}</strong></p>
      {
        user.about && <p>{user.about}</p>
      }
      <p 
      className="font-italic"
      >{`${user.name} joined on ${new Date(user.created).toDateString()}`}</p>
      </div>
      {
        isAuthenticated().user && isAuthenticated().user._id === user._id && (
          <div className="profileButtons">
            <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-3 mb-2 custom_btn">
                  Edit Profile
            </Link>
            <Link to={`/post/create`} className="btn btn-raised btn-info mr-3 mb-2 custom_btn">
            create Post
      </Link>
            <DeleteUser userId={user._id}/>
          </div>
        )
      }
    </div>
  </div>
  <div className="row">
      <div className="col md-12">
        <hr/>
        {
          posts.length === 0 ? (<h4>{user.name} created 0 posts</h4>) : (
            <Fragment>
            <h2>User's Posts</h2>
             <div className="posts_container">
            {posts.map(post => <Post  post={post}  key={post._id} />)}  
            </div>
            </Fragment>
          )
        }
      </div>
  </div>
  </Fragment>
)

  return (
    <div className="container">
    <h2 className="mt-5 mb-5 ml-2">Profile</h2>

      {loading ? <Spinner/> :
        isAuthenticated().token && (
          renderProfile()
        ) 
      }  
    </div>
  )
}

export default Profile

