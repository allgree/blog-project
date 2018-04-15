import React from 'react';

import Loader from '../components/Content/Loader';
import PostItem from '../components/Content/PostItem';


import {connect} from 'react-redux';

import {fetchPostsSample, deletePost} from "../actions/postsListActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";
import {fetchLoginData} from "../actions/loginActions";
import {autoload} from '../functions/autoload';
import {like} from '../functions/like';
import {moveUp} from "../functions/move_up";


@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,

        posts: store.postsList.posts,
        is_posts_fetching: store.postsList.is_fetching,
        posts_empty: store.postsList.empty,

        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Posts extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchPostsSample(0));
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    triggerPostLike(post_id) {
        like(post_id, this.props.login, this.props.post_likes, this.props.dispatch, deletePostLike, addPostLike);
    }

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePost(post_id));
    }

    render() {
        let posts = this.props.posts.map((post, index) => {
            let user = this.props.users.find(item => item.id === post.user_id);
            let likes = this.props.post_likes.filter(item => item.post_id === post.id);
            let users = likes.map((like, index) => {
                return this.props.users.find(item => item.id === like.user_id);
            });
            return <PostItem key={index}
                             post={post}
                             user={user}
                             likes={likes}
                             users={users}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });
        return (
            <div className="content_posts">
                <a name="label_up"/>
                        {this.props.posts.length !== 0 &&
                            <div>{posts}</div>}
                    <span className="point"/>
                    {this.props.is_posts_fetching &&
                    <Loader/>}
                <div className="link_to_up"><a href="#label_up"/></div>
            </div>
        )
    }

    componentDidMount() {
        $(document).off();
        $(document).on('scroll', () => {
            moveUp();
            autoload(this.props.is_posts_fetching,
                     this.props.posts_empty,
                     this.props.dispatch,
                     fetchPostsSample,
                     this.props.posts.length)
        });
    }

}