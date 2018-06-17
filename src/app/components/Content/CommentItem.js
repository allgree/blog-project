import React from 'react';
import {Link} from 'react-router-dom';

import TooltipLikes from './TooltipLikes';
import DeleteWindow from './DeleteWindow';

export default class CommentItem extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.time = 500;
        this.state = {
            tooltip: ''
        };
        this.tooltipHide = this.tooltipHide.bind(this);
        this.deleteWindowHide = this.deleteWindowHide.bind(this);
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
            tooltip: '',
            delete: false
        });
    }

    deleteWindowHide() {
        this.setState({
            delete: false
        })
    }

    render() {
        let timestamp = Date.parse(this.props.comment.createdAt);
        let date = new Date();
        date.setTime(timestamp);
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let created_date = `${day}.${month}.${date.getFullYear()}`;
        let created_time = `${date.getHours()}:${date.getMinutes()}`;


        return (
            <div className="content__post_comment">
                {this.state.delete &&
                <DeleteWindow id={this.props.comment.id}
                              method={this.props.delete}
                              hide={this.deleteWindowHide}
                              question={'Удалить комментарий?'}/>}
                <p className="content__post_comment_body">
                    {this.props.comment.body}
                </p>
                <p className="content__post_comment_author">
                    <Link to={`/user/${this.props.user.id}`}
                          className="content__post_comment_author_link">
                        {this.props.user.name} {this.props.user.surname}
                    </Link>
                </p>

                <div className="content__post_comment_info">
                    <i className="fa fa-calendar" aria-hidden="true"/>&nbsp;<span>{created_date}</span>
                    &nbsp;&nbsp;
                    <i className="fa fa-clock-o" aria-hidden="true"/>&nbsp;<span>{created_time}</span>
                    &nbsp;&nbsp;
                    <span className="content__post_comment_likes post_like"
                         id={`comment_id_${this.props.comment.id}`}
                         onMouseEnter={() => {this.tooltipShow()}}
                         onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}
                         onClick={() => {this.props.triggerLike(this.props.comment.id)}}>
                        <div className="tooltip tooltip_comment" id={`tooltip_${this.props.comment.id}`}>
                            {this.state.tooltip}
                        </div>
                        <span>
                            <i className="fa fa-heart" aria-hidden="true"/>
                            {this.props.likes.length === 0 ? '' : this.props.likes.length}
                        </span>
                    </span>
                    {Object.keys(this.props.login).length !== 0 && this.props.comment.user_id === this.props.login.id &&
                        <span className="content__post_comment_delete"
                              onClick={() => {this.setState({delete: true})}}>
                        <i className="fa fa-trash-o" aria-hidden="true"/>
                        </span>
                    }
                </div>

            </div>
        )
    }
}