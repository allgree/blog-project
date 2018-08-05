import React from 'react';
import {Link} from 'react-router-dom';

import {formatTimestamp} from "../../componentsFunctions/formatTimestamp";

import TooltipLikes from './TooltipLikes';
import DeleteWindow from './DeleteWindow';

export default class CommentItem extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.time = 500;
        this.state = {
            tooltip: false
        };
        this.tooltipHide = this.tooltipHide.bind(this);
        this.deleteWindowHide = this.deleteWindowHide.bind(this);
    }

    // показать панель лайков
    tooltipShow() {
        if (this.props.comment.likes.length === 0) return;
        this.setState({
            tooltip: true
        })
    }

    // скрыть панель лайков
    tooltipHide() {
        this.setState({
            tooltip: '',
            delete: false
        });
    }

    // скрыть диалоговое окно удаления
    deleteWindowHide() {
        this.setState({
            delete: false
        })
    }

    render() {

        let {created_date, created_time} = formatTimestamp(this.props.comment.createdAt);

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
                    <Link to={`/user/${this.props.comment.author.id}`}
                          className="content__post_comment_author_link">
                        {this.props.comment.author.name} {this.props.comment.author.surname}
                    </Link>
                </p>

                <div className="content__post_comment_info">
                    <span className="content__post_comment_info_span">
                        <i className="fa fa-calendar" aria-hidden="true"/>&nbsp;<span>{created_date}</span>
                    </span>
                    <span className="content__post_comment_info_span">
                        <i className="fa fa-clock-o" aria-hidden="true"/>&nbsp;<span>{created_time}</span>
                    </span>
                    <span className="content__post_comment_likes post_like"
                         id={`comment_id_${this.props.comment.id}`}
                         onMouseEnter={() => {this.tooltipShow()}}
                         onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}
                         onClick={() => {this.props.triggerLike(this.props.comment.id)}}>
                        <div className="tooltip tooltip_comment" id={`tooltip_${this.props.comment.id}`}>
                            {this.state.tooltip &&
                            <div onMouseEnter={() => {clearTimeout(this.timeout)}}
                                 onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                                <TooltipLikes users={this.props.comment.likes}/>
                            </div>}
                        </div>
                        <span>
                            <i className="fa fa-heart" aria-hidden="true"/>&nbsp;
                            {this.props.comment.likes.length === 0 ? '' : this.props.comment.likes.length}
                        </span>
                    </span>
                    {this.props.login.id && (this.props.comment.author.id === this.props.login.id || this.props.post_author.id === this.props.login.id) &&
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