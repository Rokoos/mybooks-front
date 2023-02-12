import { Fragment } from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div className="container mt-5 mb-5">
      <Fragment>
        <h4 className="mt-3 mb-3">Users</h4>

        {users.length < 1 ? (
          <h4>Nima użytkowników</h4>
        ) : (
          users.map((user) => (
            <div
              className="rounded d-flex bg-light justify-content-between mb-2 p-2"
              key={user._id}
            >
              <span>
                <Link to={`/user/${user._id}`}>{user.name}</Link> joined{" "}
                {new Date(user.createdAt).toDateString()}
              </span>
              <span>{user.email}</span>
            </div>
          ))
        )}
      </Fragment>
    </div>
  );
};

export default Users;
