import React from 'react';
//import {Link} from 'react-router';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';

import {fetchPost} from "../actions/postActions";
import {fetchPostComments} from "../actions/postCommentsActions";
import {fetchUsers} from "../actions/usersListActions";
import {fetchPostLikes} from "../actions/postLikesActions";
import {fetchCommentLikes} from "../actions/commentLikesActions";

import CommentItem from '../components/Content/CommentItem';
import Loader from '../components/Content/Loader';
import TooltipLikes from '../components/Content/TooltipLikes';


@connect((store) => {
    return {
        post: store.post.post,
        is_post_fetching: store.post.is_fetching,
        comments: store.postComments.comments,
        is_post_comments_fetching: store.postComments.is_fetching,
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,
        comment_likes: store.commentLikes.likes,
        comment_likes_fetching: store.commentLikes.is_fetching
    }
})
export default class Post extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchPost(this.props.match.params.post_id));
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchPostComments(this.props.match.params.post_id));
        this.props.dispatch(fetchCommentLikes());
        this.timeout = 0;
        this.time = 500;
        this.state = {
            tooltip: ''
        };
        this.tooltipHide = this.tooltipHide.bind(this);
        this.post_likes = [];
        this.users_like = [];
    }



    tooltipShow() {
        if (this.users_like.length === 0) return;
        this.setState({
            tooltip: <div onMouseEnter={() => {clearTimeout(this.timeout)}}
                          onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                <TooltipLikes users={this.users_like}/>
            </div>
        })
    }

    tooltipHide() {
        this.setState({
            tooltip: ''
        });
    }

    render() {
        this.post_likes = this.props.post_likes.filter(like => like.post_id === this.props.post.id);
        this.users_like = this.post_likes.map((like, index) => {
           return this.props.users.find(item => item.id === like.user_id);
        });
        let post_author = this.props.users.find(item => item.id === this.props.post.user_id);
        let comments = this.props.comments.map((comment, index) => {
           let user = this.props.users.find(item => item.id === comment.user_id);
           let likes = this.props.comment_likes.filter(item => item.comment_id === comment.id);
           let users = likes.map((like, index) => {
               return this.props.users.find(item => item.id === like.user_id);
           });
           return <CommentItem key={index}
                               comment={comment}
                               user={user}
                               likes={likes}
                               users={users}/>
        });
        return (
            <div>
                <div className="content__post">
                    <TransitionGroup className="transition_group">
                        {!post_author || this.props.is_post_fetching
                        ? <Loader/>
                        : <CSSTransition timeout={1000}
                                         classNames="appearance">
                                <div>
                                    <h2 className="content__post_title">{this.props.post.title}</h2>
                                    <p className="content__post_body">{this.props.post.body}</p>
                                    <p className="content__post_author">
                                        Автор:&nbsp;
                                        <Link to={`/user/${post_author.id}`}
                                              className="content__post_author_link">
                                            {post_author.name} {post_author.surname}
                                        </Link>
                                    </p>
                                    <div className="content__post_info">
                                        <span className="post_view">
                                            <i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}
                                        </span>&nbsp;
                                        <div className="tooltip" id={`tooltip_${this.props.post.id}`}>
                                            {this.state.tooltip}
                                        </div>
                                        <span className="post_like"
                                              onMouseEnter={() => {this.tooltipShow()}}
                                              onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                                            <i className="fa fa-heart" aria-hidden="true"/> {this.post_likes.length === 0 ? '' : this.post_likes.length}
                                        </span>
                                    </div>
                                </div>
                          </CSSTransition>
                        }
                    </TransitionGroup>
                </div>
                <div className="content__post_comments">
                    <h3 className="content__post_comments_header">Комментарии</h3>
                    <TransitionGroup className="transition_group">
                    {this.props.is_users_fetching || this.props.is_post_comments_fetching
                        ? <Loader/>
                        : <CSSTransition timeout={1000}
                                         classNames="appearance">
                            <div>{comments}</div>
                          </CSSTransition>
                    }
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}