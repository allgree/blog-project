import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import PostItem from '../components/Content/PostItem';
import UserTop from '../components/Content/UserTop';
import Loader from '../components/Content/Loader';

import {connect} from 'react-redux';

import {fetchTopLikesPost} from '../actions/topLikesPostsActions';
import {fetchTopViewsPost} from "../actions/topViewsPostsActions";
import {fetchUsers} from "../actions/usersListActions";
import {fetchBloger} from "../actions/blogerActions";
import {fetchCommentator} from "../actions/commentatorActions";

@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
        top_likes_posts: store.topLikesPosts.posts,
        is_top_likes_posts_fetching: store.topLikesPosts.is_fetching,
        top_views_posts: store.topViewsPosts.posts,
        is_top_views_posts_fetching: store.topViewsPosts.is_fetching,
        bloger: store.bloger.user,
        is_bloger_fetching: store.bloger.is_fetching,
        commentator: store.commentator.user,
        is_commentator_fetching: store.commentator.is_fetching
    }
})

export default class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchTopLikesPost());
        this.props.dispatch(fetchTopViewsPost());
        this.props.dispatch(fetchBloger());
        this.props.dispatch(fetchCommentator());
    }

    render() {
        let top_views_posts = this.props.top_views_posts.map((post, index) => {
            let user = this.props.users.find(item => item.id === post.user_id);
            return <PostItem key={index}
                               post={post}
                               user={user}
                                />
        });
        let top_likes_posts = this.props.top_likes_posts.map((post, index) => {
            let user = this.props.users.find(item => item.id === post.user_id);
            return <PostItem key={index}
                             post={post}
                             user={user}
                             />
        });

        return (
            <div className="content__main">
                <div className="content__top_users">
                    <aside className="content__top_user">
                        <h2 className="content__top_user_h2">Самый активный блогер</h2>
                        <TransitionGroup className="transition_group">
                            {this.props.is_bloger_fetching || this.props.is_users_fetching
                                ? <Loader/>
                                : <CSSTransition timeout={1000}
                                                 classNames="appearance">
                                    <UserTop user={this.props.bloger}/>
                                </CSSTransition>
                            }
                        </TransitionGroup>
                    </aside>
                    <aside className="content__top_user">
                        <h2 className="content__top_user_h2">Самый активный комментатор</h2>
                        <TransitionGroup className="transition_group">

                            {this.props.is_commentator_fetching || this.props.is_users_fetching
                                ? <Loader/>
                                :
                                <CSSTransition timeout={1000}
                                               classNames="appearance">
                                    <UserTop user={this.props.commentator}/>
                                </CSSTransition>
                            }
                        </TransitionGroup>
                    </aside>

                </div>
                <div className="content__top_posts">
                    <aside className="content__top_post_aside">
                        <h2 className="content__top_post_h2">Топ 5 просмотренных записей</h2>
                        <TransitionGroup className="transition_group">
                            {this.props.is_top_views_posts_fetching || this.props.is_users_fetching
                                ? <Loader/>
                                : <CSSTransition timeout={1000}
                                                 classNames="appearance">
                                    <div>
                                        {top_views_posts}
                                     </div>
                                </CSSTransition>
                            }
                        </TransitionGroup>
                    </aside>
                    <aside className="content__top_post_aside">
                        <h2 className="content__top_post_h2">Топ 5 отмеченных записей</h2>
                        <TransitionGroup className="transition_group">
                            {this.props.is_top_likes_posts_fetching || this.props.is_users_fetching
                                ? <Loader/>
                                : <CSSTransition timeout={1000}
                                                 classNames="appearance">
                                     <div>
                                         {top_likes_posts}
                                     </div>
                                </CSSTransition>
                            }
                        </TransitionGroup>
                    </aside>
                </div>

            </div>
        )
    }
}