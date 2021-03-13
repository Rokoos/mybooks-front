import React from 'react'
import Modal from '../components/Modal'
import { withRouter} from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'
import {remove } from './apiUser'



const DeleteUser = ({userId, history}) => {
  const deleteAccount = () => {
    const token = isAuthenticated().token
    remove(userId, token)
    .then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        signout(() => console.log("User is deleted"))
        history.push('/')
      }
    })
  }
  return (
    <Modal remove={deleteAccount} title={"Delete Profile"} text={"Are You sure You want to delete your account?"}/>
  )
}

export default withRouter(DeleteUser)

