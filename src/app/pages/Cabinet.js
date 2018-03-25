import React from 'react';
import {Redirect} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import Loader from '../components/Content/Loader';
import PostForm from '../components/Content/PostForm';

import {fetchUserPosts, addUserPost, deleteUserPost} from "../actions/userPostsActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";

@connect((store) => {
    return {
        login: store.login.login,

        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,

        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching,

        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,
    }
})
export default class Cabinet extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchUserPosts(this.props.login.id));
        this.props.dispatch(fetchPostLikes());
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    triggerPostLike(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        if (this.props.post_likes.find(item =>
                item.post_id === post_id && item.user_id === this.props.login.id)) {
            this.props.dispatch(deletePostLike(post_id, this.props.login.id));
        } else {
            this.props.dispatch(addPostLike(post_id, this.props.login.id));
        }
    }

    addPost(values) {
        if (Object.keys(this.props.login).length === 0 || !values.title || !values.body) return;
        this.props.dispatch(addUserPost(this.props.login.id, values.title, values.body));
    }

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deleteUserPost(post_id));
    }

    render() {
        if (Object.keys(this.props.login).length === 0) {
            return <Redirect to="/login"/>
        }
        let posts = this.props.user_posts.map((post, index) => {
            let likes = this.props.post_likes.filter(item => item.post_id === post.id);
            let users = likes.map((like, index) => {
                return this.props.users.find(item => item.id === like.user_id);
            });
            return <PostItem key={index}
                             post={post}
                             likes={likes}
                             users={users}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });
        return (
            <div className="content__cabinet">
                <div className="content__cabinet__login">
                    <div className="content__cabinet__login_ava">
                        <img src={this.props.login.avatar_path} className="big_avatar"/>
                    </div>
                    <h2 className="content__cabinet__login_name">{this.props.login.name} {this.props.login.surname}</h2>
                    <p className="content__cabinet__login_info">Город: {this.props.login.city}</p>
                    <p className="content__cabinet__login_info">Возраст: {this.props.login.age}</p>
                    <p className="content__cabinet__login_info">Email: <a href={`mailto:${this.props.login.email}`}>{this.props.login.email}</a></p>
                    <p className="content__cabinet__login_info">Веб-сайт: <a href={`http://${this.props.login.site}`} target="_blank">{this.props.login.site}</a></p>
                </div>
                <div>
                    <TransitionGroup>
                        {
                            this.props.is_user_posts_fetching || this.props.is_users_fetching || this.props.is_post_likes_fetching
                            ? <Loader/>
                            : <CSSTransition timeout={1000}
                                             classNames="appearance">
                                    <div>{posts}</div>
                              </CSSTransition>
                        }
                    </TransitionGroup>
                    <PostForm onSubmit={this.addPost}/>
                </div>
            </div>
        )

    }
}