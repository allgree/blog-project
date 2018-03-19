import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

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
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUser(this.props.match.params.user_id));
        this.props.dispatch(fetchUserPosts(this.props.match.params.user_id));
    }

    render() {
        let posts = this.props.user_posts.map((post, index) => {
            return <PostItem key={index} post={post}/>
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
                    this.props.is_user_posts_fetching
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