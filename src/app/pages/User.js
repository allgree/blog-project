import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import UserItem from '../components/Content/UserItem';
import UserProfile from '../components/Content/UserProfile';
import Loader from '../components/Content/Loader';

import {fetchUser} from "../actions/userActions";
import {fetchUserPostsSample} from "../actions/userPostsActions";
import {addPostLike, deletePostLike} from "../actions/postLikesActions";
import {fetchLoginData} from "../actions/loginActions";
import {fetchUserSubsSample} from "../actions/subsActions";
import {fetchUserFollowersSample, addFollower, deleteFollower} from "../actions/followersActions";


import {autoload} from '../componentsFunctions/autoload';
import {like} from '../componentsFunctions/like';
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";

@connect((store) => {
    return {
        user: store.user.user,
        is_user_fetching: store.user.is_fetching,

        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching,
        user_posts_empty: store.userPosts.empty,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching,

        subs: store.subs.subs,
        is_subs_fetching: store.subs.is_fetching,
        subs_empty: store.subs.empty,

        followers: store.followers.followers,
        is_followers_fetching: store.followers.is_fetching,
        followers_empty: store.followers.empty,
    }
})

export default class User extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());

        this.props.dispatch(fetchUser(this.props.match.params.user_id));
        this.props.dispatch(fetchUserPostsSample(0, this.props.match.params.user_id));
        this.props.dispatch(fetchUserSubsSample(0, this.props.match.params.user_id));
        this.props.dispatch(fetchUserFollowersSample(0, this.props.match.params.user_id));
        this.state = {
            content: 'posts'
        };

        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.subscript = this.subscript.bind(this);
        this.unsubscript = this.unsubscript.bind(this);
    }

    // добавить/удалить лайк к посту
    triggerPostLike(post_id) {
        like(this.props.user_posts,
            post_id,
            this.props.dispatch,
            addPostLike,
            deletePostLike,
            this.props.login.id);
    }

    // изменить отображаемый контент
    triggerContent(content) {
        this.setState({content: content});
    }

    // подписаться на пользователя
    subscript() {
        this.props.dispatch(addFollower(this.props.login.id, this.props.user.id));
    }

    // отписаться от пользователя
    unsubscript() {
        this.props.dispatch(deleteFollower(this.props.login.id, this.props.user.id));
    }



    render() {
        if (this.props.login.id && this.props.login.id === +this.props.match.params.user_id) {
            return <Redirect to="/cabinet"/>
        }

        let posts = this.props.user_posts.map((post, index) => {
             return <PostItem post={post}
                              key={index}
                              triggerLike={this.triggerPostLike}
                              login={this.props.login}/>
        });

        let subs = this.props.subs.map((sub, index) =>{
            return <UserItem key={index}
                             user={sub.sub_user}
                             button={false}
                             change_match_param={true}/>;
        });

        let followers = this.props.followers.map((subscribe, index) => {
           return <UserItem key={index}
                            user={subscribe.user}
                            button={false}
                            change_match_param={true}/>
        });

        return (
            <div className="content__user">
                <aside className="content__user_aside fixed">
                    {this.props.is_user_fetching
                        ? <Loader/>
                        : <UserProfile user={this.props.user}
                                       followers={this.props.followers}
                                       login={this.props.login}
                                       subscript={this.subscript}
                                       unsubscript={this.unsubscript}/>
                    }
                    <button disabled={this.state.content === 'posts'}
                            onClick={() => {this.triggerContent('posts')}}
                            className="button_custom button_show_user_content">
                        Записи
                    </button>
                    <button disabled={this.state.content === 'subscriptions'}
                            onClick={() => {this.triggerContent('subscriptions')}}
                            className="button_custom button_show_user_content">
                        Подписки
                    </button>
                    <button disabled={this.state.content === 'followers'}
                            onClick={() => {this.triggerContent('followers')}}
                            className="button_custom button_show_user_content">
                        Подписчики
                    </button>

                </aside>

                {this.state.content === 'posts' &&
                    <aside className="content__user_aside user_content">
                        {this.props.user_posts.length !== 0 &&
                        <div>{posts}</div>}
                        <span className="point"/>
                        {this.props.is_user_posts_fetching &&
                        <Loader/>}
                    </aside>
                }
                {this.state.content === 'subscriptions' &&
                    <aside className="content__user_aside user_content">
                        {this.props.subs.length !== 0 &&
                        <div>{subs}</div>}
                        <span className="point"/>
                        {this.props.is_subs_fetching &&
                        <Loader/>}
                    </aside>
                }
                {this.state.content === 'followers' &&
                <aside className="content__user_aside user_content">
                    {this.props.subs.length !== 0 &&
                    <div>{followers}</div>}
                    <span className="point"/>
                    {this.props.is_followers_fetching &&
                    <Loader/>}
                </aside>
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
                case 'posts': {
                    autoload(this.props.is_user_posts_fetching,
                             this.props.user_posts_empty,
                             this.props.dispatch,
                             fetchUserPostsSample,
                             this.props.user_posts.length,
                             this.props.match.params.user_id);
                    break;
                }
                case 'subscriptions': {
                    autoload(this.props.is_subs_fetching,
                        this.props.subs_empty,
                        this.props.dispatch,
                        fetchUserSubsSample,
                        this.props.subs.length,
                        this.props.match.params.user_id);
                    break;
                }
                case 'followers': {
                    autoload(this.props.is_followers_fetching,
                             this.props.followers_empty,
                             this.props.dispatch,
                             fetchUserFollowersSample,
                             this.props.followers.length,
                             this.props.match.params.user_id);
                    break;
                }
            }
        });
    }
}