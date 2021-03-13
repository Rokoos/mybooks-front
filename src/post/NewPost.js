import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import Spinner from '../components/Spinner'
import { isAuthenticated} from '../auth'
import { createPost} from './apiPost'
import { errorMessage, charNumber} from '../utils'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import DefaultPhoto from '../images/bookAvatar.png'


export default class NewPost extends Component {

    state = {
        author: '',
        title: '',
        body: '',
        photo: '',
        error: '',
        user: {},
        fileSize: 0,
        loading: false,
        redirectToProfile: false,
        preview: ''
    }

    componentDidMount(){
        this.postData = new FormData()
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const {author, title, body,  fileSize} = this.state

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
        fileSize,
        preview: window.URL.createObjectURL(file),
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





    handleSubmit = e => {
        e.preventDefault()
        this.setState({loading: true})

        if(this.isValid()){
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        createPost(userId, token, this.postData).then(data => {
            if(data.error){
                console.log(data.error)
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

    renderForm = (author, title, body, error, photo) => (
        <MDBRow center className="mt-5 mb-5">
          <MDBCol md="8" lg="6" xl="6">
            <MDBCard>
            <form onSubmit={this.handleSubmit} >
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-3">
                    <strong>Create Post</strong>
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
                  label="Book Author"
                  type="text"
                  className="mb-5"
                  />
                  <MDBInput
                  onChange={this.handleChange('title')}
                  value={title}
                  label="Book Title"
                  type="text"
                  className="mb-5"
                  />
                
                <MDBInput
                  onChange={this.handleChange('body')}
                  value={body}
                  type="textarea"
                  label="Write Your post"
                  rows="5"
                  style={{overflowY: 'visible'}}
                />
                {charNumber(body, 1000) <= 0 ? <p style={{color: 'red'}}>{charNumber(body, 1000)}</p> : <p>{body.length} of 1000</p>} 
                <div className="text-center mb-3">
                  <MDBBtn
                    type='submit'
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Create Post
                  </MDBBtn>
                </div>      
                  
              </MDBCardBody>
              </form>
            </MDBCard>
            
          </MDBCol>
        </MDBRow>
    );
  render() {

    const {author, title,body,  error, redirectToProfile, loading, preview} = this.state
    if(redirectToProfile){
      return <Redirect to={`/posts`} />
    }

    const photo = preview ? preview : DefaultPhoto

    return (
      <MDBContainer>
      { loading ? <Spinner/>  : this.renderForm(author,title,body, error, photo)}
      </MDBContainer>
    )
  }
}
