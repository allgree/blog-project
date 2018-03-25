import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import PostItem from '../components/Content/PostItem';
import UserTop from '../components/Content/UserTop';
import Loader from '../components/Content/Loader';

import {connect} from 'react-redux';

import {fetchPostsList, deletePost} from "../actions/postsListActions";
import {fetchUsers} from "../actions/usersListActions";
import {fetchBloger} from "../actions/blogerActions";
import {fetchCommentator} from "../actions/commentatorActions";
import {fetchPostLikes, addPostLike, deletePostLike} from "../actions/postLikesActions";


@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,

        posts: store.postsList.posts,
        is_posts_fetching: store.postsList.is_fetching,

        bloger: store.bloger.user,
        is_bloger_fetching: store.bloger.is_fetching,
        
        commentator: store.commentator.user,
        is_commentator_fetching: store.commentator.is_fetching,

        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,

        login: store.login.login
    }
})

export default class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchPostsList());
        this.props.dispatch(fetchBloger());
        this.props.dispatch(fetchCommentator());
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.deletePost = this.deletePost.bind(this);
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

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePost(post_id));
    }

    render() {
        let top_views_posts_info = this.props.posts.sort((a, b) => {
            return b.views - a.views;
        }).slice(0, 5);
        let top_views_posts = top_views_posts_info.map((post, index) => {
            let user = this.props.users.find(user => user.id === post.user_id);
            let likes = this.props.post_likes.filter(like => like.post_id === post.id);
            let users = likes.map((like, index) => {
                return this.props.users.find(user => user.id === like.user_id);
            });
            return <PostItem key={index}
                             post={post}
                             user={user}
                             likes={likes}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}
                             />
        });


        let likes_posts = this.props.posts.map((post, index) => {
           let likes = this.props.post_likes.filter(like => like.post_id === post.id);
            return {...post, likes: likes.length};
        });
        let top_likes_posts_info = likes_posts.sort((a, b) => {
            return b.likes - a.likes;
        }).slice(0, 5);
        let top_likes_posts = top_likes_posts_info .map((post, index) => {
            let user = this.props.users.find(user => user.id === post.user_id);
            let likes = this.props.post_likes.filter(like => like.post_id === post.id);
            let users = likes.map((like, index) => {
                return this.props.users.find(user => user.id === like.user_id);
            });
            return <PostItem key={index}
                             post={post}
                             user={user}
                             likes={likes}
                             users={users}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}
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
                            {this.props.is_top_views_posts_fetching || this.props.is_users_fetching || this.props.is_post_likes_fetching
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
                            {this.props.is_top_likes_posts_fetching || this.props.is_users_fetching || this.props.is_post_likes_fetching
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