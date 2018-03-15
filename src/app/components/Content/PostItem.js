import React from 'react';
import {Link} from 'react-router';

export default class PostItem extends React.Component {
    render() {
        return (
            <div className="content__post_top">
                <Link to={`/post/${this.props.post.id}`}
                      className="content__post_top_link">
                    <h3 className="content__post_top_head">{this.props.post.title}</h3>
                    <div className="content__post_top_body">{this.props.post.body}</div>
                </Link>
                    {this.props.user
                    ?
                    <p className="content__post_top_author">
                        <Link to={`/user/${this.props.user.id}`}
                              className="content__post_top_author_link">
                            {this.props.user.name} {this.props.user.surname}
                        </Link>
                    </p>
                    :
                    ''}
                <p className="content__post_top_info">
                    <span className="post_view"><i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}</span>&nbsp;
                    <span className="post_like"><i className="fa fa-heart" aria-hidden="true"/> {this.props.post.likes === 0 ? '' : this.props.post.likes}</span>
                </p>
            </div>
        )
    }

}