import React from 'react';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import Loader from '../components/Content/Loader';

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
        let posts = this.props.user_posts.map((post, index) => {
            return <PostItem key={index} post={post}/>
        });
        return (
            <div className="content">
                {
                    this.props.is_user_fetching
                    ?
                        <aside className="content__user_aside user_info_fixed">
                            <Loader/>
                        </aside>
                     :
                        <aside className="content__user_aside user_info_fixed">
                            <div className="content__user_ava_div">
                                <img src={this.props.user.avatar_path} className="big_avatar"/>
                            </div>
                            <h2 className="content__user_name">{this.props.user.name} {this.props.user.surname}</h2>
                            <p className="content__user_info">Город: {this.props.user.city}</p>
                            <p className="content__user_info">Возраст: {this.props.user.age}</p>
                            <p className="content__user_info">Email: <a href={`mailto:${this.props.user.email}`}>{this.props.user.email}</a></p>
                            <p className="content__user_info">Веб-сайт: <a href={`http://${this.props.user.site}`} target="_blank">{this.props.user.site}</a></p>
                        </aside>
                }
                {
                    this.props.is_user_posts_fetching
                    ?
                        <aside className="content__user_aside">
                            <Loader/>
                        </aside>
                    :
                        <aside className="content__user_aside">
                            {posts}
                        </aside>
                }
            </div>
        )
    }
}