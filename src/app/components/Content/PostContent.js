import React from 'react';
import {Link} from 'react-router-dom';

import TooltipLikes from './TooltipLikes';
import DeleteWindow from './DeleteWindow';

export default class PostContent extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.time = 500;
        this.state = {
            tooltip: false,
            delete: false
        };
        this.tooltipHide = this.tooltipHide.bind(this);
        this.deleteWindowHide = this.deleteWindowHide.bind(this);
    }

    deleteWindowHide() {
        this.setState({
            delete: false
        })
    }

    tooltipShow() {
        if (this.props.post.likes.length === 0) return;
        this.setState({
            tooltip: true
        })
    }

    tooltipHide() {
        this.setState({
            tooltip: ''
        });
    }

    render() {
        if (Object.keys(this.props.post).length === 0) return null;

        let timestamp = Date.parse(this.props.post.createdAt);
        let date = new Date();
        date.setTime(timestamp);
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let created_date = `${day}.${month}.${date.getFullYear()}`;
        let created_time = `${date.getHours()}:${date.getMinutes()}`;

        return (
            <div className="content__post">
                {this.state.delete &&
                <DeleteWindow id={this.props.post.id}
                              method={this.props.delete}
                              hide={this.deleteWindowHide}
                              question={`Удалить запись "${this.props.post.title}"?`}/>}
                <div>
                    <h2 className="content__post_title">{this.props.post.title}</h2>
                    <p className="content__post_body">{this.props.post.body}</p>
                    <p className="content__post_author">
                        Автор:&nbsp;
                        <Link to={`/user/${this.props.post.author.id}`}
                              className="content__post_author_link">
                            {this.props.post.author.name} {this.props.post.author.surname}
                        </Link>

                    </p>

                    <div className="content__post_info">
                                    <span>
                                        <span className="content__post_info_span">
                                            <i className="fa fa-calendar" aria-hidden="true"/>&nbsp;{created_date}
                                        </span>
                                        <span className="content__post_info_span">
                                            <i className="fa fa-clock-o" aria-hidden="true"/>&nbsp;{created_time}
                                        </span>
                                    </span>
                        <span className="content__post_info_span post_view">
                                        <i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}
                                    </span>
                        <div className="tooltip" id={`tooltip_${this.props.post.id}`}>
                            {this.state.tooltip &&
                            <div onMouseEnter={() => {clearTimeout(this.timeout)}}
                                 onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                                <TooltipLikes users={this.props.post.likes}/>
                            </div>}
                        </div>
                        <span className="content__post_info_span post_like"
                              onMouseEnter={() => {this.tooltipShow()}}
                              onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}
                              onClick={() => {this.props.triggerLike()}}>
                                        <i className="fa fa-heart" aria-hidden="true"/> {this.props.post.likes.length === 0 ? '' : this.props.post.likes.length}
                                    </span>
                        {Object.keys(this.props.login).length !== 0 && this.props.post.author.id === this.props.login.id &&
                        <span className="content__post_delete"
                              onClick={() => {this.setState({delete: true})}}>
                                        <i className="fa fa-trash-o" aria-hidden="true"/>
                                    </span>}
                        </div>
                    </div>

            </div>
        )

    }
}