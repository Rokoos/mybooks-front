import React, { Component, Fragment } from 'react'
import { Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import { singlePost, like, unlike} from './apiPost'
import {sortedComments } from '../utils'
import DeletePost from "./DeletePost";
import Spinner from '../components/Spinner'
import Comment from './Comment'

import DefaultPhoto from '../images/bookAvatar.png'

export default class SinglePost extends Component {
    
    state = {
        post: '',
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    }
    

    checkLike = likes => {
      const userId = isAuthenticated() && isAuthenticated().user._id
      let match = likes.indexOf(userId) !== -1
      return match
    }


    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if(data.error) {
                console.log(data.error)
            }else{
                this.setState({
                  post: data,
                  likes: data.likes.length,
                  like: this.checkLike(data.likes),
                  comments: data.comments
                })
            }

        })
    }

    updateComments = comments => {
      this.setState({comments})
    }

    likeToggle = () => {
      if(!isAuthenticated()) {
        this.setState({redirectToSignin: true})
        return false
      }
      let callApi = this.state.like ? unlike : like

      const userId = isAuthenticated().user._id
      const postId = this.state.post._id
      const token = isAuthenticated().token

      callApi(userId, token, postId).then(data => {
        if(data.error){
          console.log(data.error)
        }
        else{
          this.setState({
            like: !this.state.like,
            likes: data.likes.length
          })
        }
      })
    }

    renderPost = (post) => {
      const posterId = post.postedBy.visible === 1 
        ?`/user/${post.postedBy._id}`: `/post/${post._id}`        
      const posterName = post.postedBy.visible === 1  ? post.postedBy.name: 'Unknown'  
       
       const { like, likes} = this.state
      return (
            <div className="card-body" >
               <div className="mb-3 single_post-photo  text-center">
               <img 
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} 
                alt={post.title}
                style={{height: '300px'}}
                onError={i => i.target.src = `${DefaultPhoto}`}
                className="img-thumbnail mb-3 mt-3" />
                <h5 className="card-title">{post.author}</h5>
                <h4 className="card-title">
                  <i>{post.title}</i>
                </h4>
               </div>
                <p className="card-text comment_text">
                    {post.body}
                </p>
                <div 
                className="mb-4 single_post-info">
               <div >
                {like ? (
                  <h4 
                  className="single_post-like"
                  onClick={this.likeToggle}
                  >
                  <i className="fa fa-thumbs-up text-success mr-2" style={{cursor: 'pointer'}}></i>
                  {likes}</h4>
                ) : (
                  <h4
                  className="single_post-like"
                  onClick={this.likeToggle}>
                  <i className="fa fa-thumbs-up mr-2" style={{cursor: 'pointer'}}></i>
                  {likes}</h4>
                )}
               </div> 
                <p className="font-italic comment-info-user"
                > Posted by {" "}
                    <Link to={`${posterId}`}>{posterName}{" "}</Link>
                    on {new Date(post.created).toDateString()}      
                </p>
                </div>
                
                <div className=" profileButtons">
                  <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5 custom_btn">Back to posts</Link>

                  {
                    isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                      <Fragment>
                      <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-success mr-5 custom_btn">Update Post</Link>  
                        <DeletePost
                        postId={post._id} />
                      </Fragment>
                    )
                  }    
                 
                </div>            
            </div>
        )
    }
    
  render() {
      const { post,  redirectToSignin, comments} = this.state
      
      
      if(redirectToSignin){
        return <Redirect to={'/signin'} />
    }
    return (
      <div className="container mb-5">
        {!post ? (
          <Spinner/>
        ) : (
          this.renderPost(post)
        ) }
        <Comment 
        postId={post._id} 
        updateComments={this.updateComments}
        comments={sortedComments(comments)} 
        /> 
        
      </div>
    )
  }
}

