import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import TooltipLikes from './TooltipLikes';
import DeleteWindow from './DeleteWindow';

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching,
        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,
    }
})
export default class PostItem extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.time = 500;
        this.state = {
            users: [],
            tooltip: '',
            delete: false
        };
        this.tooltipShow = this.tooltipShow.bind(this);
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
            tooltip: ''
        });
    }

    deleteWindowHide() {
        this.setState({
            delete: false
        })
    }

    render() {
        let timestamp = Date.parse(this.props.post.createdAt);
        let date = new Date();
        date.setTime(timestamp);
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let created_date = `${day}.${month}.${date.getFullYear()}`;
        let created_time = `${date.getHours()}:${date.getMinutes()}`;

        let body = '';
        this.props.post.body.length > 300
        ? body = this.props.post.body.substr(0, 300) + '...'
        : body = this.props.post.body;

        return (
                <div className="content__post_item block_item">
                    {this.state.delete &&
                    <DeleteWindow id={this.props.post.id}
                                  method={this.props.delete}
                                  hide={this.deleteWindowHide}
                                  question={'Удалить запись?'}/>}
                    <Link to={`/post/${this.props.post.id}`}
                          className="content__post_item_link">
                        <h3 className="content__post_item_head">{this.props.post.title}</h3>
                        <div className="content__post_item_body">{body}</div>
                    </Link>
                    {this.props.user &&
                    <p className="content__post_item__author">
                        <Link to={`/user/${this.props.user.id}`}
                              className="content__post_item_author_link">
                            {this.props.user.name} {this.props.user.surname}
                        </Link>
                    </p>}

                    <div className="content__post_item_info">
                        <span className="content__post_item_info_span">
                            <i className="fa fa-calendar" aria-hidden="true"/>&nbsp;<span>{created_date}</span>
                        </span>
                        <span className="content__post_item_info_span">
                            <i className="fa fa-clock-o" aria-hidden="true"/>&nbsp;<span>{created_time}</span>
                        </span>
                        <span className="content__post_item_info_span post_view">
                            <i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}
                        </span>
                        <div className="tooltip" id={`tooltip_${this.props.post.id}`}>
                            {this.state.tooltip}
                        </div>
                        <span className="post_like"
                              id={`post_id_${this.props.post.id}`}
                              onMouseEnter={() => {this.tooltipShow()}}
                              onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}
                              onClick={() => {this.props.triggerLike(this.props.post.id)}}>
                             <i className="fa fa-heart" aria-hidden="true"/>&nbsp;
                            {this.props.likes.length === 0 ? '' : this.props.likes.length}
                        </span>
                        {Object.keys(this.props.login).length !== 0 && this.props.post.user_id === this.props.login.id &&
                        <span className="content__post_item_delete"
                              onClick={() => {this.setState({delete: true})}}>
                                      <i className="fa fa-trash-o" aria-hidden="true"/>
                        </span>}
                    </div>
                </div>
        )
    }

}