import React from 'react';

import {connect} from 'react-redux';

import {fetchUser} from "../actions/userActions";
import {fetchUserPosts} from "../actions/userPostsActions";

@connect((store) => {
    return {
        user: store.user.user,
        is_user_fetching: store.user.is_fetching,
        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching
    }
})

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchUser(this.props.params.user_id));
        this.props.dispatch(fetchUserPosts(this.props.params.user_id));
    }

    render() {
        console.log(this.props);
        return (
            <div className="content">
                <h2>Пользователь</h2>
            </div>
        )
    }
}