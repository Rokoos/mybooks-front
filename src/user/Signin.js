import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter, MDBNavLink } from 'mdbreact';
import { signin, authenticate} from '../auth'
import { errorMessage } from '../utils'
import Spinner from '../components/Spinner'

export default class Signin extends Component {
state = {
    email:'',
    password: '',
    error: '',
    redirect: false,
    loading: false
}

handleChange = name => e => {
    this.setState({error: ''})
    this.setState({[name]: e.target.value})
}

handleSubmit = e => {
    e.preventDefault()
    this.setState({loading: true})
    const { email, password} = this.state
    const user = {
        email,
        password
    }
    signin(user)
    .then(data => {
        if(data.error){
            this.setState({error: data.error, loading: false})
        }else{
            authenticate(data, () => {
                this.setState({redirect: true})
            })
        }
    })
    }

  render() {
      const { email, password, error, redirect, loading} = this.state

      if(redirect){
          return <Redirect to="/" />
      }

      if(loading){
          return <Spinner/>
      }
    return (
          <MDBRow center className="mt-5 mb-5">
            <MDBCol md="6" lg="4">
              <MDBCard >
                <MDBCardBody className="mx-4">
                <form onSubmit={this.handleSubmit} >
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Sign in</strong>
                    </h3>
                    {error && errorMessage(error)}
                  </div>
                  <MDBInput
                  onChange={this.handleChange('email')}
                  value={email}
                    label="Your email"
                    type="email"
                    className="mb-5"
                  />
                  <MDBInput
                  onChange={this.handleChange('password')}
                  value={password}
                  className="mb-5"
                  label="Your password"
                    type="password"
                  />
                 
                  <div className="text-center mb-3">
                  
                    <MDBBtn
                      type="submit"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Sign in
                    </MDBBtn>
                  </div>      
                  </form>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <div className="font-small grey-text d-flex  align-items-center">
                    <span>Or </span>
                    <MDBNavLink to="/signup" className="blue-text">
                      Sign up
                    </MDBNavLink>
                  </div>
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
      );
  }
}

