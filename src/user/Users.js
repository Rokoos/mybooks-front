import React, { Component,} from 'react'
import {fetchUsers} from './apiUser'
import Spinner from '../components/Spinner'
import User from './User'

export default class Users extends Component {
    state = {
      users: [],
      loading: false
  }

    componentDidMount(){
        this.setState({loading: true})
        fetchUsers()
        .then(data => {
            if(data.error) {
              console.log(data.error)
              this.setState({loading: false})
            }
            else this.setState({users: data, loading: false})
        })
    }


  renderUsers = users => users.map(user => <User user={user} key={user._id}/>
        )
  render() {
      const {users, loading} = this.state
      return (
        <div className="container"> 
            <h2 className="mt-5 mb-5">Users</h2>
            <div className="posts_container">
            {
              loading ? (<Spinner/>) : users.length === 0 ? (<h5 className="mt-5 mb-5">There are no registered users.</h5>) : this.renderUsers(users)
            }
            </div>
        </div>  
      )
  }
}
