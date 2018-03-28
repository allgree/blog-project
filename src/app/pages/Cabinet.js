import React from 'react';
import {Redirect} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import axios from 'axios';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import Loader from '../components/Content/Loader';
import PostForm from '../components/Content/forms/PostForm';
import UserProfile from '../components/Content/UserProfile';
import EditUserForm from '../components/Content/forms/EditUserForm';
import EditPassForm from '../components/Content/forms/EditPassForm';

import {fetchUserPosts, addUserPost, deleteUserPost} from "../actions/userPostsActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";
import {editUser} from "../actions/loginActions";

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
        this.triggerShow = this.triggerShow.bind(this);
        this.editUser = this.editUser.bind(this);
        this.editPass = this.editPass.bind(this);
        this.state = {
            show: 'info'
        }
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

    triggerShow(param) {
        this.setState({
            show: param
        })
    }

    editUser(values) {
        values.id = this.props.login.id;
        this.props.dispatch(editUser(values));
        this.setState({
            show: 'info'
        })
    }

    editPass(values) {
        let incorrect_caution = document.querySelector('.pass_incorrect');
        let mismatch_caution = document.querySelector('.pass_mismatch');
        incorrect_caution.style.display = 'none';
        mismatch_caution.style.display = 'none';
        if (values.pass1 === values.pass2) {
            axios.post('/api/users/pass',
                {
                    user_id: this.props.login.id,
                    password: values.password,
                    new_pass: values.pass1
                }).then((responce) => {
                    if (responce.data[0] === 1) {
                        this.setState({
                            show: 'info'
                        })
                    } else {
                        incorrect_caution.style.display = 'inline';
                    }
            })
        } else {
            mismatch_caution.style.display = 'inline';
        }
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
                        <button className="button__change_avatar">
                            Сменить аватар
                        </button>
                    </div>
                    {this.state.show === 'info' &&
                    <UserProfile login={this.props.login}
                                 click={this.triggerShow}/>}
                    {this.state.show === 'form' &&
                    <EditUserForm onSubmit={this.editUser}
                                  login={this.props.login}/>}
                    {this.state.show === 'pass' &&
                    <EditPassForm onSubmit={this.editPass}
                                  login={this.props.login}/>}

                </div>
                <div className="content__cabinet__posts">
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