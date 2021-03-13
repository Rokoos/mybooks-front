import React, {Fragment, lazy, Suspense} from 'react'
import { Switch, Route} from 'react-router-dom'
import {MDBContainer } from "mdbreact";



const Navbar  = lazy(() => import('./components/Nav/Nav'))
const Posts  = lazy(() => import('./post/Posts'))
const Signup  = lazy(() => import('./user/Signup'))
const Signin  = lazy(() => import('./user/Signin'))
const Profile  = lazy(() => import('./user/Profile'))
const EditProfile  = lazy(() => import('./user/EditProfile'))
const Users  = lazy(() => import('./user/Users'))
const PrivateRoute  = lazy(() => import('./auth/PrivateRoute'))
const NewPost  = lazy(() => import('./post/NewPost'))
const SinglePost  = lazy(() => import('./post/SinglePost'))
const EditPost  = lazy(() => import('./post/EditPost'))
const Home  = lazy(() => import('./components/Home'))


const routes = () => (
    <Suspense fallback={''} >
        <Navbar/>
        <MDBContainer>
          <Switch>
            <Route path="/" exact component={Home} />  
            <Route path="/posts" exact component={Posts} />  
            <PrivateRoute exact path="/post/create" component={NewPost}/>  
            <Route exact path="/post/:postId" component={SinglePost}/>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
            <Route path="/users" exact component={Users} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
            <PrivateRoute path="/user/:userId" exact component={Profile} />
          </Switch>
        </MDBContainer>  
    </Suspense>
  )


export default routes
