import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export default class CommentItem extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.state = {
            users: [],
            tooltip: ''
        };
        this.tooltipHide = this.tooltipHide.bind(this);
    }

    tooltipShow() {
        axios.get(`/api/users/like-comment/${this.props.comment.id}`)
            .then((result) => {
                this.setState({
                    users: result.data
                });
                this.setState({
                    tooltip:
                        <div className="tooltip_content tooltip_comment"
                            onMouseEnter={() => {clearTimeout(this.timeout)}}
                            onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, 1000)}}>
                            {this.state.users.map((user, index) => {
                                return (
                                    <p className='tooltip_user' key={index}>
                                        <Link to={`/user/${user.id}`} className="tooltip_user_link">
                                            <img src={`${user.avatar_path}`} className="ava_tooltip"/> {`${user.name} ${user.surname}`}
                                        </Link>
                                    </p>
                                )
                            })}
                        </div>
                })
            })
    }

    tooltipHide() {
        this.setState({
            tooltip: ''
        });
    }

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

                <div className="content__post_comment_likes post_like"
                    id={`comment_id_${this.props.comment.id}`}
                    onMouseEnter={() => {this.tooltipShow()}}
                    onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, 1000)}}>
                    <div className="tooltip" id={`tooltip_${this.props.comment.id}`}>{this.state.tooltip}</div>
                    <span>
                        <i className="fa fa-heart" aria-hidden="true"/>
                        {this.props.comment.likes === 0 ? '' : this.props.comment.likes}
                    </span>
                </div>
            </div>
        )
    }
}