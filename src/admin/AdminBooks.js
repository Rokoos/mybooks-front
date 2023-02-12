import { Fragment } from "react";
import { Link } from "react-router-dom";

const Books = ({ books }) => {
  // console.log("books", books);
  return (
    <div className="container mt-5 mb-5">
      <Fragment>
        <h4 className="mt-3 mb-5">Books</h4>

        {books.length < 1 ? (
          <h4>Nie dodano jeszcze żadnych książek</h4>
        ) : (
          books.map((book) => (
            <div
              className="rounded d-flex bg-light justify-content-between mb-2 p-2"
              key={book._id}
            >
              <Link to={`/book/${book._id}`}>{book.title}</Link>
              <span>
                by
                <Link
                  className="pl-2"
                  to={`/user/${book.postedBy._id}`}
                >{`${book.postedBy.name}`}</Link>
              </span>
            </div>
          ))
        )}
      </Fragment>
    </div>
  );
};

export default Books;
