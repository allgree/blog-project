import React from 'react';
import {Link} from 'react-router';

export default class CommentItem extends React.Component {
    render() {
        return (
            <div className="content__post_comment">
                <p className="content__post_comment_body">
                    {this.props.comment.body}
                </p>
                <p className="content__post_comment_author">
                    <Link to={`/user/${this.props.user.id}`}
                          className="content__post_comment_author_link">
                        {this.props.user.name} {this.props.user.surname}
                    </Link>
                </p>
                <p className="content__post_comment_likes post_like">
                    <i className="fa fa-heart" aria-hidden="true"/>
                    {this.props.comment.likes === 0 ? '' : this.props.comment.likes}
                </p>
            </div>
        )
    }
}