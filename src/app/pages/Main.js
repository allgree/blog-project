import React from 'react';

import {connect} from 'react-redux';

import {fetchTopPost} from '../actions/topPostsActions';

@connect((store) => {
    return {
        posts: store.topPosts.posts,
        is_top_posts_fetching: store.topPosts.is_fetching
    }
})

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchTopPost());
    }


    render() {
        console.log(this.props.posts);
        return (
            <div className="content">
                <h1>Main Page</h1>
            </div>
        )
    }
}