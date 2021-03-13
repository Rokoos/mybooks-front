import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import { singlePost, updatePost } from './apiPost'
import { isAuthenticated } from '../auth'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import {errorMessage, charNumber, getPostPhoto} from '../utils'
import Spinner from '../components/Spinner'
import bookAvatar from '../images/bookAvatar.png'

export default class EditPost extends Component {
    state = {
        id: '',
        author: '',
        title: '',
        body: '',
        redirectToProfile: false,
        error: '',
        photo:'',
        fileSize: 0,
        loading: false,
        preview:''
    }

    componentDidMount(){
        this.postData = new FormData()
        const postId = this.props.match.params.postId
        singlePost(postId)
        .then(data => {
            if(data.error){
                this.setState({redirectToProfile: true})
            }else{
                this.setState({
                    id: data._id,
                    author: data.author,
                    title: data.title,
                    body: data.body,
                    error: ''
                })
            }
        })
    }

    isValid = () => {
        const {author,title, body,  fileSize} = this.state

        if (fileSize > 100000) {
            this.setState({ error: "File size should be less than 100kb",loading: false });
            return false
          }

        if (
          author.length === 0 || title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false});
            return false
          }
        if ( body.length  > 1000) {
            this.setState({ error: 'Post may contain up to 1000 characters', loading: false});
            return false
          }  
          return true
    }

    handleImage = name => e => {
      this.setState({error: '', loading: true})
      let file = e.target.files[0]
      let value = name === 'photo' && e.target.files[0] 
      const fileSize = name === 'photo' ? e.target.files[0].size : 0
      this.postData.set(name, value)
      this.setState({
        [name]: value,
        preview: window.URL.createObjectURL(file) ,
        fileSize,
        loading: false
    })
    }

    handleChange = name => e => {
        this.setState({error: '', loading: true})
        let value = name === 'photo' ? e.target.files[0] : e.target.value
        this.postData.set(name, value)
        this.setState({
            [name]: value,
            loading: false
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.setState({loading: true})

        if(this.isValid()){
        const postId = this.state.id
        const token = isAuthenticated().token

        updatePost(postId, token, this.postData).then(data => {
            if(data.error){
                this.setState({error: data.error})
            } 
            else{
                this.setState({
                    loading: false,
                    author: '',
                    title: '',
                    body: '',
                    photo: '',
                    redirectToProfile: true
                })
            }
        })
        }
        
    }

    editPostForm = (author,title, body, error, photo) => (
        <MDBRow center className="mt-5 mb-5">
          <MDBCol md="8" lg="6" xl="6">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-3">
                    <strong>Update Post</strong>
                  </h3>
                  {error && errorMessage(error)}
                </div>
                <div className="edit_post-photo">
                  <img className="img-fluid z-depth-1 mb-5" src={photo}
                  onError={ i => i.target.src = `${bookAvatar}`}
                  style={{width: "10rem"}} alt={title}/> 
                </div>
                  <div className="input-group mb-3">
                  <div className="custom-file">
                    <input 
                    onChange={this.handleImage('photo')}
                    type="file" className="custom-file-input" id="file"/>
                    <label className="custom-file-label" htmlFor="file">Choose file</label>
                  </div>
                </div>
                  <MDBInput
                  onChange={this.handleChange('author')}
                  value={author}
                  label="Update Author"
                  type="text"
                  className="mb-5"
                  />
                  <MDBInput
                  onChange={this.handleChange('title')}
                  value={title}
                  label="Update Title"
                  type="text"
                  className="mb-5"
                  />
                
                <MDBInput
                  onChange={this.handleChange('body')}
                  value={body}
                  type="textarea"
                  label="Update Your Post"
                  rows="5"
                  style={{overflowY: 'visible'}}
                />
                {charNumber(body, 1000) <= 0 ? <p style={{color: 'red'}}>{charNumber(body, 1000)}</p> : <p>{body.length} of 1000</p>} 
                <div className="text-center mb-3">
                  <MDBBtn
                    type='button'
                    onClick={this.submitHandler}
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Update Post
                  </MDBBtn>
                </div>      
                  
              </MDBCardBody>
            </MDBCard>
            
          </MDBCol>
        </MDBRow>
    );
  render() {
      const {id, author, title, body, error, redirectToProfile, loading, preview} = this.state

      const photoUrl = id ? `${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}` :  bookAvatar

      const ziutek = preview ? preview : photoUrl

      if(redirectToProfile){
        return <Redirect to={`/user/${isAuthenticated().user._id}`} />
    }
    return (
      <MDBContainer>
          {loading ? <Spinner/> :this.editPostForm(author,title, body, error, ziutek)}
      </MDBContainer>
    )
  }
}
