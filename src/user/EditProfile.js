import React, { Component } from "react";
import Spinner from "../components/Spinner";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { fetchUser, updateUser, isUser } from "./apiUser";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdbreact";
import { errorMessage, charNumber, getUserPhoto } from "../utils";
import avatar from "../images/avatar.png";

export default class EditProfile extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    about: "",
    redirectToProfile: false,
    photo: "",
    error: "",
    loading: false,
    preview: "",
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.userData = new FormData();
    // console.log("userDataStart", this.userData);
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;
    fetchUser(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
          photo: getUserPhoto(userId) || avatar,
          error: "",
          fileSize: 0,
          loading: false,
        });
      }
    });
  }

  isValid = () => {
    const { name, about, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100kb" });
      return false;
    }

    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }

    if (about && about.length > 500) {
      this.setState({
        error: "About may contain up to 500 characters",
        loading: false,
      });
      return false;
    }

    return true;
  };

  handleImage = (name) => (e) => {
    this.setState({ error: "", loading: true });
    let file = e.target.files[0];
    let value = name === "photo" && e.target.files[0];
    const fileSize = name === "photo" ? e.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({
      [name]: value,
      preview: window.URL.createObjectURL(file),
      fileSize,
      loading: false,
    });
  };

  handleChange = (name) => (e) => {
    this.setState({ error: "", loading: true });
    let value = name === "photo" ? e.target.files[0] : e.target.value;
    this.userData.set(name, value);
    this.setState({
      [name]: value,
      loading: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      updateUser(userId, token, this.userData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          isUser(data, () => {
            this.setState({ redirectToProfile: true });
          });
        }
      });
    }
  };

  renderForm = (name, error, about, photoUrl) => (
    <MDBRow center className="mt-5 mb-5">
      <MDBCol md="6" lg="4">
        <MDBCard>
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-5">
                <strong>Edit Profile</strong>
              </h3>
              {error && errorMessage(error)}
            </div>
            <div className="edit_post-photo">
              <img
                className="img-fluid z-depth-1 rounded-circle mb-5"
                src={photoUrl}
                onError={(i) => (i.target.src = `${avatar}`)}
                style={{ width: "10rem" }}
                alt={name}
              />
            </div>
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  onChange={this.handleImage("photo")}
                  type="file"
                  className="custom-file-input"
                  id="file"
                />
                <label className="custom-file-label" htmlFor="file">
                  Choose file
                </label>
              </div>
            </div>

            <MDBInput
              onChange={this.handleChange("name")}
              value={name}
              label="Your nickname"
              type="text"
              className="mb-5"
            />
            <MDBInput
              onChange={this.handleChange("about")}
              value={about}
              type="textarea"
              label="About You..."
              rows="3"
              style={{ overflowY: "visible" }}
            />
            {about ? (
              charNumber(about, 500) <= 0 ? (
                <p style={{ color: "red" }}>{charNumber(about, 500)}</p>
              ) : (
                <p className="text-light">{about.length} of 500</p>
              )
            ) : (
              ""
            )}

            <div className="text-center mb-3">
              <MDBBtn
                onClick={this.handleSubmit}
                type="button"
                gradient="blue"
                rounded
                className="btn-block z-depth-1a"
              >
                Update Profile
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );

  render() {
    const {
      id,
      name,
      photo,
      about,
      error,
      redirectToProfile,
      loading,
      preview,
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const mietek = preview ? preview : photo;

    return (
      <MDBContainer>
        {loading ? <Spinner /> : this.renderForm(name, error, about, mietek)}
      </MDBContainer>
    );
  }
}
