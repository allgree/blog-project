import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Loader from '../components/Content/Loader';
import PostItem from '../components/Content/PostItem';

import {connect} from 'react-redux';

import {fetchPostsList} from "../actions/postsListActions";
import {fetchUsers} from "../actions/usersListActions";
import {fetchPostLikes} from "../actions/postLikesActions";


@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
        posts: store.postsList.posts,
        is_posts_fetching: store.postsList.is_fetching,
        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching
    }
})
export default class Posts extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchPostsList());
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
                    />
        });
        return (
            <div className="content_posts">
                <TransitionGroup className="transition_group">
                    {this.props.is_posts_fetching || this.props.is_users_fetching || this.props.is_post_likes_fetching
                     ? <Loader/>
                     : <CSSTransition timeout={1000}
                                      classNames="appearance">
                            <div>
                                {posts}
                            </div>
                        </CSSTransition>
                    }
                </TransitionGroup>
            </div>
        )
    }
}