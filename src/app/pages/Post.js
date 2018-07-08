import React from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import {fetchPost} from "../actions/postActions";
import {fetchPostCommentsSample, addPostComment, deletePostComment} from "../actions/postCommentsActions";
import {addPostLike, deletePostLike} from "../actions/postLikesActions";
import {addCommentLike, deleteCommentLike} from "../actions/commentLikesActions";
import {fetchLoginData} from "../actions/loginActions";
import {deletePost} from "../actions/postsListActions";

import {autoload} from '../componentsFunctions/autoload';
import {like} from '../componentsFunctions/like';

import PostContent from '../components/Content/PostContent';
import CommentItem from '../components/Content/CommentItem';
import Loader from '../components/Content/Loader';
import CommentForm from '../components/Content/forms/CommentForm';
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";

@connect((store) => {
    return {
        post: store.post.post,
        is_post_fetching: store.post.is_fetching,

        comments: store.postComments.comments,
        is_post_comments_fetching: store.postComments.is_fetching,
        comments_empty: store.postComments.empty,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Post extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchPost(this.props.match.params.post_id));
        this.props.dispatch(fetchPostCommentsSample(0, this.props.match.params.post_id));
        this.timeout = 0;
        this.time = 500;
        this.state = {
            comment: 'button',
            redirect_after_delete: false
        };
        this.triggerCommentForm = this.triggerCommentForm.bind(this);
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.triggerCommentLike = this.triggerCommentLike.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.addComment = this.addComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.deleteWindowHide = this.deleteWindowHide.bind(this);
        this.users_like = [];
    }

    triggerPostLike(post_id) {
        like(this.props.posts,
            post_id,
            this.props.dispatch,
            addPostLike,
            deletePostLike,
            this.props.login.id);
    }

    triggerCommentLike(comment_id) {
        like(comment_id, this.props.login, this.props.comment_likes, this.props.dispatch, deleteCommentLike, addCommentLike);
    }

    triggerCommentForm(param) {
        this.setState({
            comment: param
        })
    }

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePost(post_id));
        this.setState({
            redirect_after_delete: true
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

    deleteWindowHide() {
        this.setState({
            delete: false
        })
    }

    render() {
        if (this.state.redirect_after_delete) return <Redirect to="/cabinet"/>;

        let comments = this.props.comments.map((comment, index) => {
            return <CommentItem key={index}
                                comment={comment}
                                triggerLike={this.triggerCommentLike}
                                delete={this.deleteComment}
                                login={this.props.login}/>
        });
        return (
            <div>

                {this.props.is_post_fetching
                ? <Loader/>
                : <PostContent post={this.props.post}
                               delete={this.deletePost}
                               triggerLike={this.triggerPostLike}
                               login={this.props.login}/>}



                <div className="content__post_comments">
                    <h3 className="content__post_comments_header">Комментарии</h3>
                    {(Object.keys(this.props.login).length !== 0 && this.state.comment === 'button') &&
                    <button onClick={() => {this.triggerCommentForm('form')}}
                            className="button_custom button_add_comment">
                        Добавить комментарий
                    </button>}
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
                <div className="link_to_up" onClick={() => {scrollTop()}}/>
            </div>
        )
    }

    componentDidMount() {
        scrollTop();
        $(document).off();
        $(document).on('scroll', () => {
            linkUp();
            autoload(this.props.is_post_comments_fetching,
                this.props.comments_empty,
                this.props.dispatch,
                fetchPostCommentsSample,
                this.props.comments.length,
                this.props.match.params.post_id)
        });

    }
}