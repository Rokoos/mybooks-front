import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { errorMessage, charNumber } from "../utils";
import avatar from "../images/avatar.png";
import { MDBInput } from "mdbreact";
import Modal from "../components/Modal";

export default class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({ error: "" });
    this.setState({ text: e.target.value });
  };

  // isValid = () => {
  //   const { text } = this.state;
  //   if (!text.length > 0 || text.length > 500) {
  //     this.setState({
  //       error: "Comment should not be empty or more than 500 characters long",
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  addComment = (e) => {
    // this.setState({ loading: true });
    e.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "Please sign in to add a comment" });
      this.setState({ text: "" });
      return false;
    }

    const userId = isAuthenticated().user._id;
    const userName = isAuthenticated().user.name;
    const token = isAuthenticated().token;
    const postId = this.props.post._id;
    const postTitle = this.props.post.title;
    const postUserId = this.props.post.postedBy._id;
    const postUserEmail = this.props.post.postedBy.email;

    const data = {
      userId,
      userName,
      postId,
      postTitle,
      postUserId,
      postUserEmail,
      text: this.state.text,
    };
    comment(data, token).then((data) => {
      if (data.error) {
        this.setState({
          error: data.error,
        });
      } else {
        this.props.updateComments(data.comments);
        this.setState({
          text: "",
          //  loading: false
        });
      }
    });
    // }
  };

  handleDelete = (id) => {
    const deleteComment = () => {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;
      // this.setState({ loading: true });
      uncomment(userId, token, postId, id).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.props.updateComments(data);
          this.setState({ text: "" });
        }
      });
    };

    return (
      <Modal
        remove={deleteComment}
        title={"Delete"}
        text={"Are You sure You want to delete this comment?"}
      />
    );
  };

  renderComments = (arr) =>
    arr.map((comment, i) => {
      const posterId =
        comment.commentedBy.visible === 1
          ? `/user/${comment.commentedBy._id}`
          : ``;
      const posterName =
        comment.commentedBy.visible === 1
          ? comment.commentedBy.name
          : "Unknown";

      const posterPhoto =
        comment.commentedBy.visible === 1
          ? `${process.env.REACT_APP_API_URL}/user/photo/${comment.commentedBy._id}`
          : avatar;

      return (
        <div className="mb-4 comment_box" key={i}>
          <div style={{ display: "flex" }}>
            <Link className="hidden_avatar" to={posterId}>
              <img
                style={{ borderRadius: "50%", border: "1px solid #000" }}
                className="float-left mr-2"
                height="30px"
                width="30px"
                onError={(i) => (i.target.src = `${avatar}`)}
                src={posterPhoto}
                alt={comment.commentedBy.name}
              />
            </Link>
            <p className=" comment_text mb-3">{comment.text}</p>
          </div>
          <div className="comment_info">
            <p className="font-italic mark comment_info-user">
              {" "}
              Added by <Link to={posterId}>{posterName} </Link> on{" "}
              {new Date(comment.createdAt).toDateString()}
            </p>
            {isAuthenticated().user &&
              isAuthenticated().user._id === comment.commentedBy._id &&
              this.handleDelete(comment._id)}
          </div>
        </div>
      );
    });

  render() {
    const { comments } = this.props;
    // console.log("comments", comments);
    const { text, error } = this.state;
    return (
      <Fragment>
        <h2 className="mt-5 mb-5">Leave a comment</h2>

        <form onSubmit={this.addComment}>
          <MDBInput
            onChange={this.handleChange}
            value={text}
            type="textarea"
            style={{ overflowY: "visible" }}
            label="Write Your Comment"
            rows="3"
          />
          {charNumber(text, 500) <= 0 ? (
            <p style={{ color: "red" }}>{charNumber(text, 500)}</p>
          ) : (
            <p>{text.length} of 500</p>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <button className="btn btn-raised btn-dark mt-2 mb-5 mr-3 custom_btn">
              Add comment
            </button>
          </div>
        </form>
        {error && errorMessage(error)}

        <div className="col-md-12 col-md-offset-2">
          <h3 className="text-primary">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </h3>
          <hr />
          {comments.length > 0 && this.renderComments(comments)}
        </div>
      </Fragment>
    );
  }
}
