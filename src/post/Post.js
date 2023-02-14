import React from "react";
import { Link } from "react-router-dom";
import { getPostPhoto } from "../utils";
import DefaultPhoto from "../images/bookAvatar.png";

const Post = ({ post, check }) => (
  <div className="post_item mb-5">
    <div className="post_item-photo">
      <img
        src={getPostPhoto(post._id)}
        alt={post.title}
        onError={(i) => (i.target.src = `${DefaultPhoto}`)}
        className="img-thumbnail mb-3 mt-3 post-img"
      />
      <h5 className="card-title">{post.author}</h5>
      <h4 className="card-title">
        <i>{post.title}</i>
      </h4>
    </div>
    <div className="post_item-descr">
      <p className="card-text comment_text">{post.body.substring(0, 200)}</p>
      <div className="post_items-info">
        {check === "1" && (
          <p className="font-italic">
            Posted by{" "}
            <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>{" "}
            on {new Date(post.createdAt).toDateString()}
          </p>
        )}

        <Link
          to={`/book/${post._id}`}
          className="btn btn-raised btn-sm btn-primary"
        >
          Read More
        </Link>
      </div>
    </div>
  </div>
);

export default Post;
