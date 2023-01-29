import React from "react";
import { withRouter } from "react-router-dom";
import { remove } from "./apiPost";
import { isAuthenticated } from "../auth";
import Modal from "../components/Modal";

const DeletePost = ({ postId, history }) => {
  const deletePost = () => {
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        history.push(`/user/${isAuthenticated().user._id}`);
      }
    });
  };
  return (
    <Modal
      remove={deletePost}
      title={"Delete Book"}
      text={"Are You sure You want to delete this book?"}
    />
  );
};

export default withRouter(DeletePost);
