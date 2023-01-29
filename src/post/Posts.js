import React, { Component } from "react";
import { postList, filterBooks } from "./apiPost";
import Post from "./Post";
import Spinner from "../components/Spinner";
import Filters from "../components/Filters";

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
    text: "",
    category: "",
    page: 1,
    numOfPages: null,
    previous: null,
    next: null,
  };

  checkActiveBtn = (arg) => {
    // console.log("arg", arg);
    if (arg === this.state.page) {
      return "paginationActive";
    }
  };

  renderBtn = (arg) => {
    // console.log("arg", arg);
    return (
      <span
        onClick={() => {
          this.setState({ page: arg });
          console.log("arg", arg);
        }}
        className={`paginationBtns ${this.checkActiveBtn(arg)}`}
        key={arg}
      >
        {arg}
      </span>
    );
  };

  renderNumbers = (num) => {
    let headers = [];
    for (let i = 1; i <= num; i++) {
      headers.push(this.renderBtn(i));
    }

    return headers;
  };

  renderPagination = () => {
    const { previous, numOfPages, next } = this.state;
    return (
      <div className=" mb-5 d-flex justify-content-center align-items-center">
        {previous && (
          <span
            onClick={() => this.setState({ page: this.state.page - 1 })}
            className="paginationBtns"
          >
            &#8810;
          </span>
        )}
        {this.renderNumbers(numOfPages)}
        {next && (
          <span
            onClick={() =>
              this.setState({ page: this.state.page + 1 }, () =>
                console.log("page next", this.state.page)
              )
            }
            className="paginationBtns"
          >
            &#8811;
          </span>
        )}
      </div>
    );
  };

  searchBooks = () => {
    const args = {
      text: this.state.text,
      category: this.state.category,
    };
    // console.log("arg", arg);
    this.setState({ loading: true });
    filterBooks(args, this.state.page).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({ loading: false });
      } else {
        this.setState({
          posts: data.results,
          loading: false,
          numOfPages: data.numberOfPages,
          previous: data.previous || null,
          next: data.next || null,
        });
        // console.log("results", data);
      }
    });
  };

  // fetchPosts = () => {
  //   this.setState({ loading: true });
  //   postList(this.state.page).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //       this.setState({ loading: false });
  //     } else {
  //       this.setState({
  //         posts: data.results,
  //         loading: false,
  //         numOfPages: data.numberOfPages,
  //         previous: data.previous || null,
  //         next: data.next || null,
  //       });
  //       // console.log("data", data);
  //     }
  //   });
  // };

  setFilters = (name) => (e) => {
    e.preventDefault();
    this.setState({ [name]: e.target.value });
  };

  resetFilters = () => {
    this.setState({ text: "", category: "", page: 1 }, () =>
      this.searchBooks(
        { text: this.state.text, category: this.state.category },
        1
      )
    );
  };

  componentDidMount() {
    const args = { text: this.state.text, category: this.state.category };
    this.searchBooks(args, this.state.page);
  }
  componentDidUpdate(prevProps, prevState) {
    const args = { text: this.state.text, category: this.state.category };

    if (prevState.page !== this.state.page) {
      this.searchBooks(args, this.state.page);
    }
  }

  showPosts = (posts) =>
    posts.map((post) => <Post post={post} check="1" key={post._id} />);

  render() {
    const { posts, loading, page, numOfPages, category } = this.state;

    return (
      <div className="container">
        <Filters
          searchBooks={this.searchBooks}
          setFilters={this.setFilters}
          resetFilters={this.resetFilters}
          text={this.state.text}
          category={this.state.category}
        />
        <h2 className="mt-5 mb-5">Books</h2>
        <div className="posts_container">
          {loading ? (
            <Spinner />
          ) : posts.length === 0 ? (
            <h5 className="mt-5 mb-5">We didn't find any books.</h5>
          ) : (
            this.showPosts(posts)
          )}
        </div>

        {numOfPages > 1 && this.renderPagination()}
      </div>
    );
  }
}

export default Posts;
