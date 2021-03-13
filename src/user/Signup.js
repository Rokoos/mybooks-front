import React, { Component } from 'react'
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter, MDBNavLink } from 'mdbreact';
import { signup} from '../auth'
import { errorMessage, successMessage} from '../utils'

export default class Signup extends Component {
state = {
    name: '',
    email:'',
    password: '',
    error: '',
    success: false
}

handleChange = name => e => {
    this.setState({error: ''})
    this.setState({[name]: e.target.value})
}

handleSubmit = e => {
    e.preventDefault()
    const {name, email, password} = this.state
    const user = {
        name,
        email,
        password
    }

    signup(user)
    .then(data => {
        if(data.error) this.setState({error: data.error})
        else 
            this.setState({
                name: '',
                email:'',
                password: '',
                error: '',
                success: true
            })
        
    })

}

  render() {
      const {name, email, password, error, success} = this.state
    return (
          <MDBRow center className="mt-5 mb-5">
            <MDBCol md="6" lg="4">
            <form onSubmit={this.handleSubmit} >
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Sign up</strong>
                    </h3>
                    {error && errorMessage(error)}
                    {success && successMessage()}
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
                      Sign up
                    </MDBBtn>
                  </div>      
                    
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <div className="font-small grey-text d-flex  align-items-center">
                    <span>Or </span>
                    <MDBNavLink to="/signin" className="blue-text">
                      Sign in
                    </MDBNavLink>
                  </div>
                </MDBModalFooter>
              </MDBCard>
              </form>
            </MDBCol>
          </MDBRow>
      );
  }
}

