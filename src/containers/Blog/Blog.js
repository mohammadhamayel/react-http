import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state ={
        posts:[],
        selectedPostId:null
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(respone => {
                const posts = respone.data.slice(0,4);
                const updatedPosts = posts.map(post=>{
                    return {
                        ...post,
                        auther:'Mohamad'
                    }
                });
                this.setState({posts: updatedPosts});
                //console.log(respone);
            });
    }

    postSelectedHandler = (id) =>{
        this.setState({selectedPostId:id});
    }
    render () {
        const posts = this.state.posts.map(posts=>{
            return <Post key={posts.id} 
                    title={posts.title} 
                    auther={posts.auther} 
                    clicked={() => this.postSelectedHandler(posts.id)}/>
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;