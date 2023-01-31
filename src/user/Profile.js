import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { fetchUser } from "./apiUser";
import DeleteUser from "./DeleteUser";
import Post from "../post/Post";
import Spinner from "../components/Spinner";
import avatar from "../images/avatar.png";

const Profile = ({ match, history }) => {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [numOfPages, setNumOfPages] = useState(null);

  const userId = match.params.userId;

  const photoUrl = user._id
    ? `${process.env.REACT_APP_API_URL}/user/photo/${
        user._id
      }?${new Date().getTime()}`
    : avatar;

  const checkActiveBtn = (arg) => {
    // console.log("arg", arg);
    if (arg === page) {
      return "paginationActive";
    }
  };

  const renderBtn = (arg) => (
    <span
      onClick={() => setPage(arg)}
      className={`paginationBtns ${checkActiveBtn(arg)}`}
      key={arg}
    >
      {arg}
    </span>
  );

  const renderNumbers = (num) => {
    let headers = [];
    for (let i = 1; i <= num; i++) {
      headers.push(renderBtn(i));
    }
    return headers;
  };

  const renderPagination = () => {
    return (
      <div className=" mb-5 d-flex justify-content-center align-items-center">
        {previousPage && (
          <span onClick={() => setPage(page - 1)} className="paginationBtns">
            &#8810;
          </span>
        )}
        {renderNumbers(numOfPages)}
        {nextPage && (
          <span onClick={() => setPage(page + 1)} className="paginationBtns">
            &#8811;
          </span>
        )}
      </div>
    );
  };

  // useEffect(() => {
  //   loadPosts(userId);
  // }, [page, userId]);

  // const loadPosts = (userId) => {
  //   const token = isAuthenticated().token;
  //   listByUser(userId, token, page).then((data) => {
  //     if (data.error) console.log(data.error);
  //     else {
  //       setPosts(data.results);
  //       setNumOfPages(data.numberOfPages);
  //       setNextPage(data.next || null);
  //       setPreviousPage(data.previous || null);
  //       setLoading(false);
  //     }
  //   });
  // };

  useEffect(() => {
    setLoading(true);
    const token = isAuthenticated().token;
    fetchUser(userId, token, page).then((data) => {
      if (data.error || data.visible === 0) {
        history.push("/users");
      } else {
        setLoading(false);
        setUser(data);
        setPosts(data.books.results);
        setNumOfPages(data.books.numberOfPages);
        setNextPage(data.books.next || null);
        setPreviousPage(data.books.previous || null);
        // console.log("books", data.books.results);
        // loadPosts(data._id);
      }
    });
  }, [page, userId]);

  const renderProfile = () => (
    <Fragment>
      <div className="row">
        {isAuthenticated().token &&
          (isAuthenticated().user._id === userId ||
            isAuthenticated().user.role === "admin") && (
            <Fragment>
              <h2 className="mt-5 mb-5 ml-2">Profile</h2>
              <div className="col-md-4">
                <img
                  className="img-fluid z-depth-1 rounded-circle ml-5 mb-5"
                  src={photoUrl}
                  onError={(i) => (i.target.src = `${avatar}`)}
                  style={{ width: "10rem" }}
                  alt={user.name}
                />
              </div>
              <div className="col-md-8 mb-5">
                <div className="lead mt-2">
                  <p className="font-italic">
                    <strong>{user.name}</strong>
                  </p>
                  {user.about && <p>{user.about}</p>}
                  <p className="font-italic">{`${
                    user.name
                  } joined on ${new Date(user.createdAt).toDateString()}`}</p>
                </div>
                <div className="profileButtons">
                  {isAuthenticated().user &&
                    isAuthenticated().user._id === userId && (
                      <Fragment>
                        <Link
                          to={`/user/edit/${user._id}`}
                          className="btn btn-raised btn-success mb-2 custom_btn"
                        >
                          Edit Profile
                        </Link>
                        <Link
                          to={`/book/create`}
                          className="btn btn-raised btn-info  mb-2 custom_btn"
                        >
                          Add Book
                        </Link>
                      </Fragment>
                    )}
                  {isAuthenticated().user &&
                    (isAuthenticated().user._id === userId ||
                      isAuthenticated().user.role === "admin") && (
                      <DeleteUser userId={userId} />
                    )}
                  <hr />
                </div>
              </div>
            </Fragment>
          )}
      </div>
      <div className="row text-center mt-5 mb-5">
        <div className="col md-12">
          {posts.length === 0 ? (
            <h4>{user.name} added 0 books so far.</h4>
          ) : (
            <Fragment>
              <h2 className="mt-5 mb-3">Books added by {user.name}</h2>
              <div className="posts_container">
                {posts.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        isAuthenticated().token && (
          <Fragment>
            {renderProfile()}
            {numOfPages > 1 && renderPagination()}
          </Fragment>
        )
      )}
    </div>
  );
};

export default Profile;
