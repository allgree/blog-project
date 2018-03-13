import React from 'react';

import PostForTop from '../components/Content/PostForTop';
import UserTop from '../components/Content/UserTop';

import {connect} from 'react-redux';

import {fetchTopPost} from '../actions/topPostsActions';
import {fetchUsers} from "../actions/usersListActions";
import {fetchBloger} from "../actions/blogerActions";
import {fetchCommentator} from "../actions/commentatorActions";

@connect((store) => {
    return {
        posts: store.topPosts.posts,
        is_top_posts_fetching: store.topPosts.is_fetching,
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
        bloger: store.bloger.user,
        is_bloger_fetching: store.bloger.is_fetching,
        commentator: store.commentator.user,
        is_commentator_fetching: store.commentator.is_fetching
    }
})

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchTopPost());
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchBloger());
        this.props.dispatch(fetchCommentator());
    }


    render() {
        console.log(this.props.commentator);
        let posts = this.props.posts.map((post, index) => {
            let user = this.props.users.find(item => item.id === post.user_id);
            return <PostForTop key={index}
                               post={post}
                               user={user}
                               />
        });
        return (
            <div className="content">
                <div className="content__top_users">
                    <aside className="content__top_user">
                        <h2 className="content__top_user_h2">Самый активный блогер</h2>
                        <UserTop user={this.props.bloger}/>
                    </aside>
                    <aside className="content__top_user">
                        <h2 className="content__top_user_h2">Самый активный комментатор</h2>
                        <UserTop user={this.props.commentator}/>
                    </aside>
                </div>
                <h2 className="content__main_posts_h2">Популярные записи</h2>
                {posts}
            </div>
        )
    }
}