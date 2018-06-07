import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import UserItem from '../components/Content/UserItem';
import Loader from '../components/Content/Loader';
import PostForm from '../components/Content/forms/PostForm';
import AvatarForm from '../components/Content/forms/AvatarForm';
import UserProfile from '../components/Content/UserProfile';
import EditUserForm from '../components/Content/forms/EditUserForm';
import EditPassForm from '../components/Content/forms/EditPassForm';

import {fetchUserPostsSample, addUserPost, deleteUserPost} from "../actions/userPostsActions";
import {fetchUsers} from "../actions/usersListActions";
import {fetchUserSubsSample} from "../actions/subsActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";
import {editUser, changeAvatar, fetchLoginData} from "../actions/loginActions";
import {autoload} from "../functions/autoload";
import {like} from '../functions/like';
import {moveUp} from "../functions/move_up";
import {scrollTop} from "../functions/scrollTop";

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

        subs: store.subs.subs,
        is_subs_fetching: store.subs.is_fetching,
        subs_empty: store.subs.empty
    }
})
export default class Cabinet extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchUserPostsSample(0, this.props.login.id));
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchUserSubsSample(0, this.props.login.id));

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
            content: 'posts'
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
        if (!files[0]) return;
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

    triggerContent() {
        this.state.content === 'posts'
            ? this.setState({content: 'subscriptions'})
            : this.setState({content: 'posts'});
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


        let subs = this.props.subs.map((sub, index) =>{
            let user = this.props.users.find(item => item.id === sub.sub_user_id);
            return <UserItem key={index}
                             user={user}/>;
        });
        return (
            <div className="content__cabinet">
                <div className="content__cabinet__login">
                    <div className="content__cabinet__login_ava">
                        <img src={this.props.login.avatar_path} className="big_avatar"/>
                        {this.state.avatar === 'button' &&
                            <div className="change_avatar__div">
                                <button onClick={() => {this.triggerAvatarButton('form')}}
                                        className="button_custom button_edit_avatar">
                                    Сменить аватар
                                </button>
                            </div>
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

                <div className="buttons">
                    <button onClick={() => {this.triggerContent()}}
                            className="button_custom button_show_content">
                        {this.state.content === 'posts' && <span>Показать подписки</span>}
                        {this.state.content === 'subscriptions' && <span>Показать записи</span>}
                    </button>
                </div>
                {this.state.content === 'posts' &&
                <div className="content__cabinet__posts">
                    {this.state.post === 'button' &&
                    <div className="add_post__div">
                        <button onClick={() => {this.triggerFormPost('form')}}
                                className="button_custom button_add_post">
                            Добавить пост
                        </button>
                    </div>}
                    {this.state.post === 'form' &&
                    <PostForm onSubmit={this.addPost}
                              click={this.triggerFormPost}/>}

                    {this.props.user_posts.length !== 0 &&
                    <div>{posts}</div>}
                    <span className="point"/>
                    {this.props.is_user_posts_fetching &&
                    <Loader/>}
                </div>
                }
                {this.state.content === 'subscriptions' &&
                <div className="content__cabinet__posts">
                    {this.props.subs.length !== 0 &&
                    <div>{subs}</div>}
                    <span className="point"/>
                    {this.props.is_subs_fetching &&
                    <Loader/>}
                </div>
                }
                <div className="link_to_up" onClick={() => {scrollTop()}}/>
            </div>
        )

    }

    componentDidMount() {
        let login__panel_input = document.querySelector('#login__panel_input');
        if (login__panel_input) login__panel_input.checked = false;
        scrollTop();

    }

    componentDidUpdate() {
        $(document).off();
        $(document).on('scroll', () => {
            moveUp();
            this.state.content === 'posts'
            ? autoload(this.props.is_user_posts_fetching,
                this.props.user_posts_empty,
                this.props.dispatch,
                fetchUserPostsSample,
                this.props.user_posts.length,
                this.props.login.id)
            : autoload(this.props.is_subs_fetching,
                this.props.subs_empty,
                this.props.dispatch,
                fetchUserSubsSample,
                this.props.subs.length,
                this.props.login.id);
        })
    }
}