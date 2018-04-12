import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {fetchPost} from "../actions/postActions";
import {fetchPostCommentsSample, addPostComment, deletePostComment} from "../actions/postCommentsActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";
import {fetchCommentLikes, addCommentLike, deleteCommentLike} from "../actions/commentLikesActions";
import {fetchLoginData} from "../actions/loginActions";
import {autoload} from '../functions/autoload';
import {like} from '../functions/like';

import CommentItem from '../components/Content/CommentItem';
import Loader from '../components/Content/Loader';
import TooltipLikes from '../components/Content/TooltipLikes';
import CommentForm from '../components/Content/forms/CommentForm';

@connect((store) => {
    return {
        post: store.post.post,
        is_post_fetching: store.post.is_fetching,

        comments: store.postComments.comments,
        is_post_comments_fetching: store.postComments.is_fetching,
        comments_empty: store.postComments.empty,

        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,

        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,

        comment_likes: store.commentLikes.likes,
        comment_likes_fetching: store.commentLikes.is_fetching,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Post extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchPost(this.props.match.params.post_id));
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPostLikes());
        this.props.dispatch(fetchPostCommentsSample(0, this.props.match.params.post_id));
        this.props.dispatch(fetchCommentLikes());
        this.timeout = 0;
        this.time = 500;
        this.state = {
            tooltip: '',
            comment: 'button'
        };
        this.tooltipHide = this.tooltipHide.bind(this);
        this.triggerCommentForm = this.triggerCommentForm.bind(this);
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.triggerCommentLike = this.triggerCommentLike.bind(this);
        this.addComment = this.addComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.post_likes = [];
        this.users_like = [];
    }

    triggerPostLike(post_id) {
        like(post_id, this.props.login, this.props.post_likes, this.props.dispatch, deletePostLike, addPostLike);
    }

    triggerCommentLike(comment_id) {
        like(comment_id, this.props.login, this.props.comment_likes, this.props.dispatch, deleteCommentLike, addCommentLike);
    }

    triggerCommentForm(param) {
        this.setState({
            comment: param
        })
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

    addComment(values) {
        if (Object.keys(this.props.login).length === 0 || !values.body) return;
        this.props.dispatch(addPostComment(this.props.post.id, this.props.login.id, values.body));
        this.setState({
           comment: 'button'
        });
    }

    deleteComment(comment_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePostComment(comment_id));
    }

    render() {
        let timestamp = Date.parse(this.props.post.createdAt);
        let date = new Date();
        date.setTime(timestamp);
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let created_date = `${day}.${month}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

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
                               users={users}
                               triggerLike={this.triggerCommentLike}
                               delete={this.deleteComment}
                               login={this.props.login}/>
        });
        return (
            <div>
                <div className="content__post">
                        {!post_author || this.props.is_post_fetching
                        ? <Loader/>
                        : <div>
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
                                        <span>
                                            {created_date}
                                        </span>
                                        &nbsp;
                                        <span className="post_view">
                                            <i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}
                                        </span>
                                        &nbsp;
                                        <div className="tooltip" id={`tooltip_${this.props.post.id}`}>
                                            {this.state.tooltip}
                                        </div>
                                        <span className="post_like"
                                              onMouseEnter={() => {this.tooltipShow()}}
                                              onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}
                                              onClick={() => {this.triggerPostLike(this.props.post.id)}}>
                                            <i className="fa fa-heart" aria-hidden="true"/> {this.post_likes.length === 0 ? '' : this.post_likes.length}
                                        </span>
                                    </div>
                                </div>
                        }
                </div>
                <div className="content__post_comments">
                    <h3 className="content__post_comments_header">Комментарии</h3>
                    {(Object.keys(this.props.login).length !== 0 && this.state.comment === 'button') &&
                    <button onClick={() => {this.triggerCommentForm('form')}}>Добавить комментарий</button>}
                    {(Object.keys(this.props.login).length !== 0 && this.state.comment === 'form') &&
                    <CommentForm onSubmit={this.addComment}
                                 click={this.triggerCommentForm}/>}

                    {this.props.comments.length !== 0 &&
                            <div>{comments}</div>
                    }
                    <span className="point"/>
                    {this.props.is_post_comments_fetching &&
                    <Loader/>}
                </div>
            </div>
        )
    }

    componentDidMount() {
        $(document).off();
        $(document).on('scroll', () => {
            autoload(this.props.is_post_comments_fetching,
                this.props.comments_empty,
                this.props.dispatch,
                fetchPostCommentsSample,
                this.props.comments.length,
                this.props.match.params.post_id)
        });

    }
}