import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import UserItem from '../components/Content/UserItem';
import Loader from '../components/Content/Loader';
import PostForm from '../components/Content/forms/PostForm';
import LoginProfile from '../components/Content/LoginProfile';
import LoginButtons from '../components/Content/LoginButtons';
import SearchForm from '../components/Content/forms/SearchForm';

import {fetchFeedPostsSample} from "../actions/feedActions";
import {fetchUserPostsSample, addUserPost} from "../actions/userPostsActions";
import {deletePost} from "../actions/deletePost";
import {fetchUserSubsSample, deleteSub} from "../actions/subsActions";
import {fetchUserFollowersSample, deleteFollower} from "../actions/followersActions";
import {addPostLike, deletePostLike} from "../actions/postLikesActions";
import {editUser, changeAvatar, fetchLoginData} from "../actions/loginActions";
import {autoloadPosts} from "../componentsFunctions/autoloadPosts";
import {autoloadUsers} from "../componentsFunctions/autoloadUsers";
import {like} from '../componentsFunctions/like';
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";
import {searchPosts} from "../componentsFunctions/searchPosts";
import {searchUsers} from "../componentsFunctions/searchUsers";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching,

        feed_posts: store.feed.posts,
        is_feed_posts_fetching: store.feed.is_fetching,
        feed_posts_empty: store.feed.empty,

        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching,
        user_posts_empty: store.userPosts.empty,

        subs: store.subs.subs,
        is_subs_fetching: store.subs.is_fetching,
        subs_empty: store.subs.empty,

        followers: store.followers.followers,
        is_followers_fetching: store.followers.is_fetching,
        followers_empty: store.followers.empty
    }
})
export default class Cabinet extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        if (this.props.login.id) {
            this.props.dispatch(fetchFeedPostsSample(0, '', this.props.login.id));
            this.props.dispatch(fetchUserPostsSample(0, '', this.props.login.id));
            this.props.dispatch(fetchUserSubsSample(0, '', '', this.props.login.id));
            this.props.dispatch(fetchUserFollowersSample(0, '', '', this.props.login.id));
        }
        this.triggerUserPostLike = this.triggerUserPostLike.bind(this);
        this.triggerFeedPostLike = this.triggerFeedPostLike.bind(this);
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.trigger = this.trigger.bind(this);
        this.editUser = this.editUser.bind(this);
        this.editPass = this.editPass.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.unsub = this.unsub.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.searchFeedPosts = this.searchFeedPosts.bind(this);
        this.searchMyPosts = this.searchMyPosts.bind(this);
        this.searchSubs = this.searchSubs.bind(this);
        this.searchFollowers = this.searchFollowers.bind(this);

        this.state = {
            info: 'info',
            avatar: 'button',
            post: 'button',
            content: 'feed',
            valid_old_pass: true,
            valid_new_pass: true
        };

        this.sch_feed_posts = '';
        this.sch_my_posts = '';
        this.sch_subs = {val1: '', val2: ''};
        this.sch_followers = {val1: '', val2: ''};

        this.extensions = ['jpeg', 'jpg'];
    }

    //поставить/убрать лайк на пост из списка Лента
    triggerFeedPostLike(post_id) {
        like(this.props.feed_posts,
            post_id,
            this.props.dispatch,
            addPostLike,
            deletePostLike,
            this.props.login.id);
    }

    // поставить/убрать лайк на пост из списка Мои записи
    triggerUserPostLike(post_id) {
        like(this.props.user_posts,
            post_id,
            this.props.dispatch,
            addPostLike,
            deletePostLike,
            this.props.login.id);
    }

    // добавить пост
    addPost(values) {
        if (Object.keys(this.props.login).length === 0 || !values.title || !values.body) return;
        this.props.dispatch(addUserPost(this.props.login.id, values.title, values.body));
        this.trigger('post', 'button');
    }

    // удалить пост
    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePost(post_id));
    }

    // изменить состояние
    trigger(param, value) {
        this.setState({
            [param]: value
        })
    }

    // изменить информацию о себе
    editUser(values) {
        values.id = this.props.login.id;
        this.props.dispatch(editUser(values));
        this.setState({
            info: 'info'
        })
    }

    // изменить пароль
    editPass(values) {
        this.setState({valid_old_pass: true});
        this.setState({valid_new_pass: true});
        if (values.pass1 === values.pass2) {
            axios.post('/api/login/pass',
                {
                    user_id: this.props.login.id,
                    password: values.password,
                    new_pass: values.pass1
                }).then((responce) => {
                    if (responce.data.result === 1) {
                        this.setState({
                            info: 'info'
                        })
                    } else {
                        this.setState({valid_old_pass: false})
                    }
            })
        } else {
            this.setState({valid_new_pass: false})
        }
    }

    // поменять аватар
    changeAvatar(files) {
        this.setState({
            valid_avatar: true
        });
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

    // отписаться от пользователя
    unsub(sub_user_id) {
        this.props.dispatch(deleteSub(this.props.login.id, sub_user_id))
    }

    // отписать пользователя от себя
    unsubscribe(user_id) {
        this.props.dispatch(deleteFollower(user_id, this.props.login.id))
    }

    // поиск постов в ленте
    searchFeedPosts(form_value) {
        this.sch_feed_posts = searchPosts(form_value,
                                          this.props.dispatch,
                                          this.sch_feed_posts,
                                          fetchFeedPostsSample,
                                          this.props.login.id);
    }

    // поиск постов во вкладке Мои записи
    searchMyPosts(form_value) {
        this.sch_my_posts = searchPosts(form_value,
                                        this.props.dispatch,
                                        this.sch_my_posts,
                                        fetchUserPostsSample,
                                        this.props.login.id)
    }

    // поиск подписок
    searchSubs(form_value) {
        this.sch_subs = searchUsers(form_value,
                                    this.props.dispatch,
                                    this.sch_subs,
                                    fetchUserSubsSample,
                                    this.props.login.id)
    }

    // поиск подписчиков
    searchFollowers(form_value) {
        this.sch_followers = searchUsers(form_value,
                                         this.props.dispatch,
                                         this.sch_followers,
                                         fetchUserFollowersSample,
                                         this.props.login.id)
    }

    render() {
        if (!this.props.login.id) {
            return <Redirect to="/login"/>
        }

        let feed_posts = this.props.feed_posts.map((post, index) => {
            return <PostItem post={post}
                             key={index}
                             triggerLike={this.triggerFeedPostLike}
                             login={this.props.login}/>
        });

        let posts = this.props.user_posts.map((post, index) => {
            return <PostItem post={post}
                             key={index}
                             triggerLike={this.triggerUserPostLike}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });

        let subs = this.props.subs.map((sub, index) =>{
            return <UserItem key={index}
                             user={sub.sub_user}
                             button={'subs'}
                             unsub={this.unsub}
                             flag={true}/>;
        });

        let followers = this.props.followers.map((follower, index) => {
            return <UserItem key={index}
                             user={follower.user}
                             button={'followers'}
                             unsub={this.unsubscribe}
                             flag={false}/>
        });

        return (
            <div className="content__cabinet">
                <LoginProfile login={this.props.login}
                              state={this.state}
                              trigger={this.trigger}
                              changeAvatar={this.changeAvatar}
                              editUser={this.editUser}
                              editPass={this.editPass}
                              extensions={this.extensions}/>

                <LoginButtons content={this.state.content}
                              trigger={this.trigger}
                              state_param="content"
                              state_feed="feed"
                              state_posts="posts"
                              state_subs="subs"
                              state_followers="followers"/>
                {this.state.content === 'feed' &&
                <div className="content__cabinet__content">
                    <SearchForm search={this.searchFeedPosts}
                                placeholder={'Введите заголовок записи'}/>
                    {this.props.feed_posts.length !== 0 &&
                    <div>{feed_posts}</div>}
                    <span className="point"/>
                    {this.props.is_feed_posts_fetching &&
                    <Loader/>}
                </div>
                }
                {this.state.content === 'posts' &&
                <div className="content__cabinet__content">
                    {this.state.post === 'button' &&
                    <div className="add_post__div">
                        <button onClick={() => {this.trigger('post', 'form')}}
                                className="button_custom button_add_post">
                            Добавить пост
                        </button>
                    </div>}
                    {this.state.post === 'form' &&
                    <PostForm onSubmit={this.addPost}
                              trigger={this.trigger}
                              state_param="post"
                              state_value="button"/>}
                    <SearchForm search={this.searchMyPosts}
                                placeholder={'Введите заголовок записи'}/>
                    {this.props.user_posts.length !== 0 &&
                    <div>{posts}</div>}
                    <span className="point"/>
                    {this.props.is_user_posts_fetching &&
                    <Loader/>}
                </div>
                }
                {this.state.content === 'subs' &&
                <div className="content__cabinet__content">
                    <SearchForm search={this.searchSubs}
                                placeholder={'Введите имя и фамилию'}/>
                    {this.props.subs.length !== 0 &&
                    <div>{subs}</div>}
                    <span className="point"/>
                    {this.props.is_subs_fetching &&
                    <Loader/>}
                </div>
                }
                {this.state.content === 'followers' &&
                <div className="content__cabinet__content">
                    <SearchForm search={this.searchFollowers}
                                placeholder={'Введите имя и фамилию'}/>
                    {this.props.followers.length !== 0 &&
                    <div>{followers}</div>}
                    <span className="point"/>
                    {this.props.is_followers_fetching &&
                    <Loader/>}
                </div>
                }
                <div className="link_to_up" onClick={() => {scrollTop()}}/>
            </div>
        )
    }

    componentDidMount() {
        scrollTop();
    }

    componentDidUpdate() {
        $(document).off();
        $(document).on('scroll', () => {
            linkUp();
            switch (this.state.content) {
                case 'feed': {
                    autoloadPosts(this.props.is_feed_posts_fetching,
                                  this.props.feed_posts_empty,
                                  this.props.dispatch,
                                  fetchFeedPostsSample,
                                  this.props.feed_posts.length,
                                  this.sch_feed_posts,
                                  this.props.login.id);
                    break;
                }
                case 'posts': {
                    autoloadPosts(this.props.is_user_posts_fetching,
                                  this.props.user_posts_empty,
                                  this.props.dispatch,
                                  fetchUserPostsSample,
                                  this.props.user_posts.length,
                                  this.sch_my_posts,
                                  this.props.login.id);
                    break;
                }
                case 'subs': {
                    autoloadUsers(this.props.is_subs_fetching,
                             this.props.subs_empty,
                             this.props.dispatch,
                             fetchUserSubsSample,
                             this.props.subs.length,
                             this.sch_subs.val1,
                             this.sch_subs.val2,
                             this.props.login.id);
                    break;
                }
                case 'followers': {
                    autoloadUsers(this.props.is_followers_fetching,
                             this.props.followers_empty,
                             this.props.dispatch,
                             fetchUserFollowersSample,
                             this.props.followers.length,
                             this.sch_followers.val1,
                             this.sch_followers.val2,
                             this.props.login.id);
                    break;
                }
            }
        })
    }
}