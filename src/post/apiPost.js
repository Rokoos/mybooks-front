export const createPost = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////

export const postList = (page) => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts?page=${page}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

/////////////////////////////////////////////

// export const listByUser = (userId, token, page) => {
//   return fetch(
//     `${process.env.REACT_APP_API_URL}/posts/by/${userId}?page=${page}`,
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .catch((error) => console.log(error));
// };

///////////////////////////////////////////////

export const singlePost = (postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const updatePost = (postId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const remove = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const filterBooks = async (arg, page) => {
  return fetch(`${process.env.REACT_APP_API_URL}/filters?page=${page}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const like = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const unlike = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const comment = (userId, token, postId, postUserId, text) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId, postUserId, text }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////

export const uncomment = (userId, token, postId, _id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId, _id }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
