import React from 'react';

import PostForTop from '../components/Content/PostForTop';

import {connect} from 'react-redux';

import {fetchTopPost} from '../actions/topPostsActions';
import {fetchUsers} from "../actions/usersListActions";

@connect((store) => {
    return {
        posts: store.topPosts.posts,
        is_top_posts_fetching: store.topPosts.is_fetching,
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching
    }
})

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchTopPost());
        this.props.dispatch(fetchUsers());
    }


    render() {
        let posts = this.props.posts.map((post, index) => {
            let user = this.props.users.find(item => item.id === post.user_id);
            return <PostForTop key={index}
                               post={post}
                               user={user}
                               />
        });
        return (
            <div className="content">
                <h2>Популярные записи</h2>
                {posts}
            </div>
        )
    }
}