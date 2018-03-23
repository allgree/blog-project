import React from 'react';
//import {Link} from 'react-router';
import {Link} from 'react-router-dom';

import TooltipLikes from './TooltipLikes';

export default class CommentItem extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.time = 500;
        this.state = {
            tooltip: ''
        };
        this.tooltipHide = this.tooltipHide.bind(this);
    }

    tooltipShow() {
        if (this.props.likes.length === 0) return;
        this.setState({
            tooltip: <div onMouseEnter={() => {clearTimeout(this.timeout)}}
                          onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                <TooltipLikes users={this.props.users}/>
            </div>
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
                    onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                    <div className="tooltip tooltip_comment" id={`tooltip_${this.props.comment.id}`}>
                        {this.state.tooltip}
                    </div>
                    <span>
                        <i className="fa fa-heart" aria-hidden="true"/>
                        {this.props.likes.length === 0 ? '' : this.props.likes.length}
                    </span>

                </div>
            </div>
        )
    }
}