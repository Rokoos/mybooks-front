import React from 'react'
import {Link} from 'react-router-dom'
import DefaultPhoto from '../images/avatar.png'

const User = ({user}) =>  (
    <div className="post_item mb-5">
      <div className="post_item-photo">
        <img 
        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
          alt={user.name}
          onError={i => i.target.src = `${DefaultPhoto}`}
        className="img-fluid z-depth-1 rounded-circle mb-3 mt-3"
        style={{width: '150px', height: '150px'}}
        />
      </div>
      <div className="post_item-descr">
        <h4 className="card-title">
            <i><strong>{user.name}</strong></i>
        </h4>
            {user.about && <p className="card-text">{user.about}</p>}
        <div className="post_items-info"> 
          <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View profile</Link>
        </div>
      </div>
    </div>
  )


export default User
