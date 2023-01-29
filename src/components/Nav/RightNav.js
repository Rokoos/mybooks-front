import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  li {
    padding: 1rem 2rem;
    align-items: center;

    a {
      color: #fff;
    }
  }

  @media (max-width: 815px) {
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    background-color: #000;
    position: fixed;
    flex-direction: column;
    align-items: start;
    z-index: 100;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;

    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = ({ open, toggle, history }) => {
  const userData = isAuthenticated();
  const toggleNavBar = () => {
    toggle(open);
  };
  const handleSignout = () => {
    toggle(open);
    signout();
  };

  // console.log("user", isAuthenticated().user);

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return "nav_active";
    }
    return "";
  };

  const renderOptions = () => {
    if (!userData.token) {
      return (
        <div className="nav_link">
          <li onClick={toggleNavBar} className={isActive(history, "/signin")}>
            <Link to="/signin">Signin</Link>
          </li>
          <li onClick={toggleNavBar} className={isActive(history, "/signup")}>
            <Link to="/signup">Signup</Link>
          </li>
        </div>
      );
    }

    return (
      <div className="nav_link">
        <li onClick={handleSignout}>
          <Link to="/">Signout</Link>
        </li>
      </div>
    );
  };

  const userOAdminOptions = () => {
    if (userData.user && userData.user.role === "user") {
      return (
        <Fragment>
          <li
            className={isActive(history, "/book/create")}
            onClick={toggleNavBar}
          >
            <Link to="/book/create">Add Book</Link>
          </li>
          <li
            className={isActive(history, `/user/${isAuthenticated().user._id}`)}
            onClick={toggleNavBar}
          >
            <Link to={`/user/${isAuthenticated().user._id}`}>
              {isAuthenticated().user.name} Profile
            </Link>
          </li>
        </Fragment>
      );
    } else if (userData.user && userData.user.role === "admin") {
      return (
        <li
          className={isActive(history, "/admin/dashboard")}
          onClick={toggleNavBar}
        >
          <Link to="/admin/dashboard">Admin Panel</Link>
        </li>
      );
    }
  };
  return (
    <Ul open={open}>
      <div className="nav_link">
        <li onClick={toggleNavBar} className={isActive(history, "/")}>
          <Link to="/">Home</Link>
        </li>
        {/* <li className={isActive(history, "/users")} onClick={toggleNavBar}>
          <Link to="/users">Users</Link>
        </li> */}
        <li className={isActive(history, "/books")} onClick={toggleNavBar}>
          <Link to="/books">Books</Link>
        </li>

        {userOAdminOptions()}
      </div>
      {renderOptions()}
    </Ul>
  );
};

export default withRouter(RightNav);
