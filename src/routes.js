import React, { Fragment, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { MDBContainer } from "mdbreact";

const Navbar = lazy(() => import("./components/Nav/Nav"));
const Posts = lazy(() => import("./post/Posts"));
const Signup = lazy(() => import("./user/Signup"));
const Signin = lazy(() => import("./user/Signin"));
const Profile = lazy(() => import("./user/Profile"));
const EditProfile = lazy(() => import("./user/EditProfile"));
const PrivateRoute = lazy(() => import("./auth/PrivateRoute"));
const NewPost = lazy(() => import("./post/NewPost"));
const SingleBook = lazy(() => import("./post/SingleBook"));
const EditPost = lazy(() => import("./post/EditPost"));
const Home = lazy(() => import("./components/Home"));

const AdminRoute = lazy(() => import("./admin/AdminRoute"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
// const AdminBooks = lazy(() => import("./admin/AdminBooks"));
// const AdminUsers = lazy(() => import("./admin/AdminUsers"));

const routes = () => (
  <Suspense fallback={""}>
    <Navbar />
    <MDBContainer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books" exact component={Posts} />
        <PrivateRoute exact path="/book/create" component={NewPost} />
        <Route exact path="/book/:postId" component={SingleBook} />
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
        <PrivateRoute path="/user/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </MDBContainer>
  </Suspense>
);

export default routes;
