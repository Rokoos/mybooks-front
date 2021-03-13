import React, { Component} from 'react'
import Spinner from '../components/Spinner'
import { Redirect} from 'react-router-dom'
import { isAuthenticated} from '../auth'
import { fetchUser, updateUser, isUser } from './apiUser'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import { errorMessage, charNumber, getUserPhoto} from '../utils'
import avatar from '../images/avatar.png'



export default class EditProfile extends Component {

  state = {
    id: '',
    name:'',
    email: '',
    about: '',
    password:'',
    redirectToProfile: false,
    photo:'',
    error: '',
    loading: false,
    preview: ''
  }

  componentDidMount(){
    this.setState({loading: true})
    this.userData = new FormData()
    const userId = this.props.match.params.userId
    const token = isAuthenticated().token
    fetchUser(userId, token)
    .then(data => {
        if(data.error){
            this.setState({redirectToProfile: true})
        }else{
            this.setState({
                id: data._id,
                name: data.name,
                email: data.email,
                about: data.about,
                error: '',
                fileSize: 0,
                loading: false
            })
        }
    })
  }

  isValid = () => {
    const {name, email, about,password, fileSize} = this.state

    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100kb"});
      return false
    }

    if (name.length === 0) {
        this.setState({ error: "Name is required", loading: false});
        return false
      }

      if (about && about.length  > 500) {
        this.setState({ error: 'About may contain up to 500 characters', loading: false});
        return false
      } 

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.setState({
          error: "A valid Email is required",
          loading: false
        });
        return false;
    }

    if (password.length >= 1 && password.length <= 5) {
        this.setState({
          error: "Password must be at least 6 characters long",
          loading: false
        });
        return false;
      }

      return true
}

handleImage = name => e => {
  this.setState({error: '', loading: true})
  let file = e.target.files[0]
  let value = name === 'photo' && e.target.files[0] 
  const fileSize = name === 'photo' ? e.target.files[0].size : 0
  this.userData.set(name, value)
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
    this.userData.set(name, value)
    this.setState({
        [name]: value,
        loading: false
    })
}

  handleSubmit = e => {
    e.preventDefault()
    this.setState({loading: true})
    if(this.isValid()) {
      const userId = this.props.match.params.userId
      const  token =  isAuthenticated().token
      updateUser(userId, token, this.userData)
      .then(data => {
          if(data.error) this.setState({error: data.error})
          else {
            isUser(data, () => {
              this.setState({redirectToProfile: true})
            })
            
          }
      })
      }
}

  renderForm = (name, email, password, error, about, photoUrl) => (
    <MDBRow center className="mt-5 mb-5">
      <MDBCol md="6" lg="4">
      
      <form onSubmit={this.handleSubmit} >
        <MDBCard>
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-5">
                <strong>Edit Profile</strong>
              </h3>
              {error && errorMessage(error)}
            </div>
            <div className="edit_post-photo">
              <img className="img-fluid z-depth-1 rounded-circle mb-5" src={photoUrl}
              onError={ i => i.target.src = `${avatar}`}
              style={{width: "10rem"}} alt={name}/> 
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
              onChange={this.handleChange('name')}
              value={name}
              label="Your nickname"
              type="text"
              className="mb-5"
              />
            <MDBInput
              onChange={this.handleChange('email')}
              value={email}
              label="Your email"
              type="email"
              className="mb-5"
            />
            <MDBInput
              onChange={this.handleChange('about')}
              value={about}
              type="textarea"
              label="About You..."
              rows="3"
              style={{overflowY: 'visible'}}
            />
           {about ? charNumber(about, 500) <= 0 ? <p style={{color: 'red'}}>{charNumber(about, 500)}</p> : <p>{about.length} of 500</p> :''}
            <MDBInput
              onChange={this.handleChange('password')}
              value={password}
              className="mb-5"
              label="Your password"
              type="password"
            />
           
            <div className="text-center mb-3">
              <MDBBtn
                type='submit'
                gradient="blue"
                rounded
                className="btn-block z-depth-1a"
              >
                Update Profile
              </MDBBtn>
            </div>      
              
          </MDBCardBody>
         
        </MDBCard>
        </form>
      </MDBCol>
    </MDBRow>
);

  render() {
    const {id,name, email, password, about, error, redirectToProfile, loading, preview} = this.state
    if(redirectToProfile){
      return <Redirect to={`/user/${id}`} />
    }

    const photoUrl = id ? getUserPhoto(id)  :  avatar

    const photo = preview ? preview : photoUrl


    return (
      <MDBContainer>
        { loading ? <Spinner/>  : this.renderForm(name, email, password, error,about, photo)}
      </MDBContainer>
    )
  }
}


// import React from 'react'

// const EditProfile = () => {

//   const [user, setUser] = useState({
//     id: '',
//     name:'',
//     email: '',
//     about: '',
//     password:'',
//     redirectToProfile: false,
//     photo:'',
//     error: '',
//     loading: false
//   })


//   return (
//     <div>
      
//     </div>
//   )
// }

// export default EditProfile

