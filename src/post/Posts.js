import React, {Component} from 'react'
import { postList} from './apiPost'
import Post from './Post'
import Spinner from '../components/Spinner'


class Posts extends Component{

    state = {
        posts: [],
        loading: false
    }

    componentDidMount() {
      this.setState({loading: true})
        postList().then(data => {
            if(data.error){
                console.log(data.error)
                this.setState({loading: false})
              }else{
                this.setState({posts: data, loading: false})
              }
        })
    }


  showPosts = posts => posts.map(post => <Post post={post} check="1" key={post._id}/>
        )
      
  render() {
     const {posts, loading} = this.state
    return (
        <div className="container">
          <h2 className="mt-5 mb-5">Posts</h2>
          <div className="posts_container">
          {
            loading ? (<Spinner/>) : posts.length === 0 ? (<h5 className="mt-5 mb-5">There are no posts.</h5>) : (this.showPosts(posts))
          }
          </div>
        </div>
      )
 }
}

export default Posts
