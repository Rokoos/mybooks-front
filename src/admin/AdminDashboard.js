import React, { Fragment, useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import AdminBooks from "./AdminBooks";
import AdminUsers from "./AdminUsers";
import Spinner from "../components/Spinner";
import { filterBooks } from "../post/apiPost";
import { fetchUsers } from "../user/apiUser";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booksOrUsers, setBooksOrUsers] = useState("books");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [numOfPages, setNumOfPages] = useState(null);

  const checkActiveBtn = (arg) => {
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

  useEffect(() => {
    setLoading(true);
    if (booksOrUsers === "books") {
      filterBooks({}, page).then((data) => {
        if (data.error) {
          console.log(data.error);
          setLoading(false);
        } else {
          // setAdminData(data.results);
          setBooks(data.results);
          setNextPage(data.next || null);
          setNumOfPages(data.numberOfPages);
          setPreviousPage(data.previous || null);
          setLoading(false);
        }
      });
    } else if (booksOrUsers === "users") {
      fetchUsers(page).then((data) => {
        if (data.error) {
          console.log(data.error);
          setLoading(false);
        } else {
          setUsers(data.results);
          setNextPage(data.next || null);
          setNumOfPages(data.numberOfPages);
          setPreviousPage(data.previous || null);
          setLoading(false);
        }
      });
    }
  }, [page, booksOrUsers]);

  const renderContent = () => (
    <Fragment>
      {booksOrUsers === "books" ? (
        <AdminBooks books={books} />
      ) : (
        <AdminUsers users={users} />
      )}
      {numOfPages > 1 && renderPagination()}
    </Fragment>
  );

  return (
    <div className="container mt-5 mb-5">
      <h4 className="mt-3 mb-3 text-center">Admin dashboard</h4>
      <hr />
      <AdminNav setBooksOrUsers={setBooksOrUsers} />
      {loading ? <Spinner /> : renderContent()}
    </div>
  );
};

export default AdminDashboard;
