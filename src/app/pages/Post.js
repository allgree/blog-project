import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';

import {fetchPost} from "../actions/postActions";
import {fetchPostComments} from "../actions/postCommentsActions";
import {fetchUsers} from "../actions/usersListActions";

import CommentItem from '../components/Content/CommentItem';
import Loader from '../components/Content/Loader';


@connect((store) => {
    return {
        post: store.post.post,
        is_post_fetching: store.post.is_fetching,
        comments: store.postComments.comments,
        is_post_comments_fetching: store.postComments.is_fetching,
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
    }
})
export default class Post extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchPost(this.props.params.post_id));
        this.props.dispatch(fetchPostComments(this.props.params.post_id));
    }


    render() {
        let post_author = this.props.users.find(item => item.id === this.props.post.user_id);
        let comments = this.props.comments.map((comment, index) => {
           let user = this.props.users.find(item => item.id === comment.user_id);
           return <CommentItem key={index}
                               comment={comment}
                               user={user}/>
        });
        return (
            <div className="content">
                {!post_author || this.props.is_post_fetching
                ?
                    <div className="content__post">
                        <Loader/>
                    </div>
                :
                    <div className="content__post">
                        <h2 className="content__post_title">{this.props.post.title}</h2>
                        <p className="content__post_body">{this.props.post.body}</p>
                        <p className="content__post_author">
                            Автор:&nbsp;
                            <Link to={`/user/${post_author.id}`}
                                  className="content__post_author_link">
                                {post_author.name} {post_author.surname}
                            </Link>
                        </p>
                        <p className="content__post_info">
                            <span className="post_view"><i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}</span>&nbsp;
                            <span className="post_like"><i className="fa fa-heart" aria-hidden="true"/> {this.props.post.likes === 0 ? '' : this.props.post.likes}</span>
                        </p>
                    </div>
                }

                {this.props.is_users_fetching || this.props.is_post_comments_fetching
                ?
                <div className="content__post_comments">
                    <Loader/>
                </div>
                :
                 <div className="content__post_comments">
                     <h3 className="content__post_comments_header">Комментарии</h3>
                     {comments}
                 </div>
                }
            </div>
        )
    }
}