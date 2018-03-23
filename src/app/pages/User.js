import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import Loader from '../components/Content/Loader';

import {fetchUser} from "../actions/userActions";
import {fetchUserPosts} from "../actions/userPostsActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";

@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
        user: store.user.user,
        is_user_fetching: store.user.is_fetching,
        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching,
        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,
        login: store.login.login
    }
})

export default class User extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchUser(this.props.match.params.user_id));
        this.props.dispatch(fetchUserPosts(this.props.match.params.user_id));
        this.triggerPostLike = this.triggerPostLike.bind(this);
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

    render() {
        let posts = this.props.user_posts.map((post, index) => {
            let likes = this.props.post_likes.filter(item => item.post_id === post.id);
            let users = likes.map((like, index) => {
                return this.props.users.find(item => item.id === like.user_id);
            });
            return <PostItem key={index}
                             post={post}
                             likes={likes}
                             users={users}
                             triggerLike={this.triggerPostLike}/>
        });
        return (
            <div className="content__user">
                <aside className="content__user_aside user_info_fixed">
                    <TransitionGroup className="transition_group">
                {
                    this.props.is_user_fetching
                    ? <Loader/>
                    : <CSSTransition timeout={1000}
                                     classNames="appearance">
                                <div>
                                    <div className="content__user_ava_div">
                                        <img src={this.props.user.avatar_path} className="big_avatar"/>
                                    </div>
                                    <h2 className="content__user_name">{this.props.user.name} {this.props.user.surname}</h2>
                                    <p className="content__user_info">Город: {this.props.user.city}</p>
                                    <p className="content__user_info">Возраст: {this.props.user.age}</p>
                                    <p className="content__user_info">Email: <a href={`mailto:${this.props.user.email}`}>{this.props.user.email}</a></p>
                                    <p className="content__user_info">Веб-сайт: <a href={`http://${this.props.user.site}`} target="_blank">{this.props.user.site}</a></p>
                                </div>
                     </CSSTransition>
                }
                    </TransitionGroup>
                </aside>
                <aside className="content__user_aside user_posts">
                    <TransitionGroup className="transition_group">
                {
                    this.props.is_user_posts_fetching || this.props.is_users_fetching || this.props.is_post_likes_fetching
                    ? <Loader/>
                    : <CSSTransition timeout={1000}
                                     classNames="appearance">
                         <div>{posts}</div>
                      </CSSTransition>
                }
                    </TransitionGroup>
                </aside>
            </div>
        )
    }
}