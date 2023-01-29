import { MDBNavLink } from "mdbreact";

export const roleBasedRedirect = (userData, history) => {
  let intended = history.location.state;
  if (intended) {
    history.push(intended.from);
  } else {
    if (userData.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/books");
    }
  }
};

export const sortedComments = (comments) => {
  return comments.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  });
};

export const successMessage = () => (
  <h6 className="alert alert-info">
    Account has been created! Please{" "}
    <MDBNavLink to="/signin">Sign in</MDBNavLink>
  </h6>
);

export const errorMessage = (error) => (
  <h6 className="alert alert-danger">{error}</h6>
);
export const charNumber = (comment, length) => length - comment.length;

export const getUserPhoto = (id) =>
  `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`;

export const getPostPhoto = (id) =>
  `${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`;

export const bookCategories = [
  "WW1",
  "WW2",
  "Cold War",
  "After Cold War",
  "Civil Aviation",
  "Aviation Safety",
  "Others",
];
