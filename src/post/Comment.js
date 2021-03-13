import React, { Component, Fragment } from 'react'
import { Link} from 'react-router-dom'
import { comment, uncomment} from './apiPost'
import { isAuthenticated } from '../auth'
import { errorMessage, charNumber} from '../utils'
import avatar from '../images/avatar.png'
import { MDBInput } from 'mdbreact';
import Modal from '../components/Modal'

export default class Comment extends Component {

    state={
        text: '',
        error: ''
    }

    handleChange = e => {
        this.setState({error: ''})
        this.setState({text: e.target.value})
    }

    isValid = () => {
        const {text} = this.state
        if(!text.length > 0 || text.length > 500){
            this.setState({error: 'Comment should not be empty or more than 500 characters long'})
            return false
        }

        return true

    }

    addComment = e => {
        this.setState({loading: true})
        e.preventDefault()

        if(!isAuthenticated()){
            this.setState({error: 'Please sign in to add a comment'})
            this.setState({text: ''})
            return false
        }

       if(this.isValid()){
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            const postId = this.props.postId
            comment(userId, token, postId, {text: this.state.text})
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                    this.setState({loading: false})
                }else {
                    //dispatch fresh list of comments to parent (SinglePost)
                    this.props.updateComments(data.comments)
                    this.setState({text: '', loading: false})
                }
            })
       }
    }

    handleDelete = (comment) => {
        const  deleteComment = () => {
            const userId = isAuthenticated().user._id
                const token = isAuthenticated().token
                const postId = this.props.postId
                uncomment(userId, token, postId, comment)
                .then(data => {
                    if(data.error) {
                        console.log(data.error)
                    }else {
                        this.props.updateComments(data.comments)
                    }
                })
          }

        return (
            <Modal remove={deleteComment} title={"Delete"} text={"Are You sure You want to delete this comment?"}/>
          )
    }

    renderComments = arr =>  (
            arr.map((comment, i) => {
                const posterId = comment.postedBy.visible === 1 
                ?
                `/user/${comment.postedBy._id}`
                : 
                ``        
                const posterName = comment.postedBy.visible === 1  ? comment.postedBy.name : 'Unknown' 

                const posterPhoto = comment.postedBy.visible === 1 ? 
                `${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}` : avatar

                return (
                        <div className="mb-4 comment_box" key={i} >
                        <div style={{display:'flex'}} >
                        <Link className="hidden_avatar" to={posterId} >
                            <img 
                            style={{borderRadius: '50%', border: '1px solid #000'}}
                            className="float-left mr-2"
                            height='30px'
                            width='30px'
                            onError={ i => i.target.src = `${avatar}`}
                            src={posterPhoto} 
                            alt={comment.postedBy.name}/>
                            </Link>
                            <p className=" comment_text mb-3"
                            >{comment.text}</p>
                        </div>
                        <div className="comment_info">
                            <p className="font-italic mark comment_info-user"
                            > Posted by {" "}
                                <Link to={posterId}>{posterName}{" "}</Link>
                                on {new Date(comment.created).toDateString()}    
                            </p>
                            {
                            isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (    
                            this.handleDelete(comment)   
                            )
                            }
                        </div>           
                </div>
                )
            })
        )
  
  

  render() {

    const {comments} = this.props
    const { text, error} = this.state
    return (
      <Fragment>
        <h2 className="mt-5 mb-5">Leave a comment</h2>
        
        <form onSubmit={this.addComment}>
            <MDBInput
                  onChange={this.handleChange}
                  value={text}
                  type="textarea"
                  style={{overflowY: 'visible'}}
                  label="Write Your Comment"
                  rows="3"
                />
            {charNumber(text, 500) <= 0 ? <p style={{color: 'red'}}>{charNumber(text, 500)}</p> : <p>{text.length} of 500</p>}
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>  
            <div></div>  
            <button className="btn btn-raised btn-dark mt-2 mb-5 mr-3 custom_btn">Post comment</button>
            </div>
        </form>
        {error && errorMessage(error)}

        <div className="col-md-12 col-md-offset-2">
        <h3 className="text-primary">{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</h3>
        <hr/>
        {comments.length > 0  && this.renderComments(comments)}
        </div>
      </Fragment>
    )
  }
}
