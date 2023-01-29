import React from "react";
import { Link } from "react-router-dom";

const AdminNav = ({ setBooksOrUsers, setAdminData }) => (
  <nav>
    <ul className="nav d-flex flex-column align-items-center  flex-md-row justify-content-md-center w-75 mx-auto">
      <Link to="/book/create" className="btn btn-sm btn-primary">
        Add Book
      </Link>

      <div
        onClick={() => setBooksOrUsers("books")}
        className="btn btn-primary btn-sm"
      >
        Books
      </div>
      <div
        onClick={() => setBooksOrUsers("users")}
        className="btn btn-primary btn-sm"
      >
        Users
      </div>
    </ul>
    <hr />
  </nav>
);

export default AdminNav;
