import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import Loader from '../components/Content/Loader';
import PostForm from '../components/Content/forms/PostForm';
import AvatarForm from '../components/Content/forms/AvatarForm';
import UserProfile from '../components/Content/UserProfile';
import EditUserForm from '../components/Content/forms/EditUserForm';
import EditPassForm from '../components/Content/forms/EditPassForm';

import {fetchUserPostsSample, addUserPost, deleteUserPost} from "../actions/userPostsActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";
import {editUser, changeAvatar, fetchLoginData} from "../actions/loginActions";
import {autoload} from "../functions/autoload";
import {like} from '../functions/like';
import {moveUp} from "../functions/move_up";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching,

        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,

        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching,
        user_posts_empty: store.userPosts.empty,

        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,
    }
})
export default class Cabinet extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchUserPostsSample(0, this.props.login.id));
        this.props.dispatch(fetchPostLikes());



        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.triggerShow = this.triggerShow.bind(this);
        this.triggerAvatarButton = this.triggerAvatarButton.bind(this);
        this.triggerFormPost = this.triggerFormPost.bind(this);
        this.editUser = this.editUser.bind(this);
        this.editPass = this.editPass.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);

        this.state = {
            info: 'info',
            avatar: 'button',
            post: 'button',
        };

        this.extensions = ['jpeg', 'jpg'];
    }

    triggerPostLike(post_id) {
        like(post_id, this.props.login, this.props.post_likes, this.props.dispatch, deletePostLike, addPostLike);
    }

    addPost(values) {
        if (Object.keys(this.props.login).length === 0 || !values.title || !values.body) return;
        this.props.dispatch(addUserPost(this.props.login.id, values.title, values.body));
        this.triggerFormPost('button');
    }

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deleteUserPost(post_id));
    }

    triggerShow(param) {
        this.setState({
            info: param
        })
    }

    triggerAvatarButton(param) {
        this.setState({
            avatar: param
        })
    }

    triggerFormPost(param) {
        this.setState({
            post: param
        })
    }

    editUser(values) {
        values.id = this.props.login.id;
        this.props.dispatch(editUser(values));
        this.setState({
            info: 'info'
        })
    }

    editPass(values) {
        let incorrect_caution = document.querySelector('.pass_incorrect');
        let mismatch_caution = document.querySelector('.pass_mismatch');
        incorrect_caution.style.display = 'none';
        mismatch_caution.style.display = 'none';
        if (values.pass1 === values.pass2) {
            axios.post('/api/login/pass',
                {
                    user_id: this.props.login.id,
                    password: values.password,
                    new_pass: values.pass1
                }).then((responce) => {
                    if (responce.data[0] === 1) {
                        this.setState({
                            info: 'info'
                        })
                    } else {
                        incorrect_caution.style.display = 'inline';
                    }
            })
        } else {
            mismatch_caution.style.display = 'inline';
        }
    }

    changeAvatar(files) {
        let name_arr = files[0].name.split('.');
        let extension = name_arr[name_arr.length - 1];
        if (this.extensions.indexOf(extension) === -1) {
            return;
        }
        let data = new FormData();
        data.append('avatar', files[0], files[0].name);
        data.append('user_id', this.props.login.id);
        this.props.dispatch(changeAvatar(this.props.login.id, data));
        this.setState({
            avatar: 'button'
        })
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
                <a name="label_up"/>
                <div className="content__cabinet__login">
                    <div className="content__cabinet__login_ava">
                        <img src={this.props.login.avatar_path} className="big_avatar"/>
                        {this.state.avatar === 'button' &&
                            <button onClick={() => {this.triggerAvatarButton('form')}}>
                                Сменить аватар
                            </button>
                        }
                        {this.state.avatar === 'form' &&
                            <AvatarForm changeAvatar={this.changeAvatar}
                                        click={this.triggerAvatarButton}/>
                        }
                    </div>
                    {this.state.info === 'info' &&
                    <UserProfile login={this.props.login}
                                 click={this.triggerShow}/>}
                    {this.state.info === 'form' &&
                    <EditUserForm onSubmit={this.editUser}
                                  login={this.props.login}
                                  click={this.triggerShow}/>}
                    {this.state.info === 'pass' &&
                    <EditPassForm onSubmit={this.editPass}
                                  login={this.props.login}
                                  click={this.triggerShow}/>}

                </div>
                <div className="content__cabinet__posts">
                    {this.state.post === 'button' &&
                    <button onClick={() => {this.triggerFormPost('form')}}>
                        Добавить пост
                    </button>}

                    {this.state.post === 'form' &&
                    <PostForm onSubmit={this.addPost}
                              click={this.triggerFormPost}/>}

                    {this.props.user_posts.length !== 0 &&
                            <div>{posts}</div>}
                    <span className="point"/>
                    {this.props.is_user_posts_fetching &&
                    <Loader/>}
                </div>
                <div className="link_to_up"><a href="#label_up"/></div>
            </div>
        )

    }

    componentDidMount() {
        $(document).off();
        $(document).on('scroll', () => {
            moveUp();
            autoload(this.props.is_user_posts_fetching,
                     this.props.user_posts_empty,
                     this.props.dispatch,
                     fetchUserPostsSample,
                     this.props.user_posts.length,
                     this.props.login.id)
        })
    }
}