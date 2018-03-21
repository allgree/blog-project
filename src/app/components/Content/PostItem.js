import React from 'react';
//import {Link} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';

import TooltipLikes from './TooltipLikes';

export default class PostItem extends React.Component {
    constructor() {
        super(...arguments);
        this.timeout = 0;
        this.time = 500;
        this.state = {
            users: [],
            tooltip: ''
        };
        this.tooltipHide = this.tooltipHide.bind(this);
    }

    tooltipShow() {
        axios.get(`/api/users/like-post/${this.props.post.id}`)
            .then((result) => {
                this.setState({
                    users: result.data
                });
                this.setState({
                    tooltip: <div onMouseEnter={() => {clearTimeout(this.timeout)}}
                                  onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                                        <TooltipLikes users={this.state.users}/>
                              </div>
                })
            });
    }

    tooltipHide() {
        this.setState({
            tooltip: ''
        });
    }


    render() {
        return (
            <div className="content__post_top">
                <Link to={`/post/${this.props.post.id}`}
                      className="content__post_top_link">
                    <h3 className="content__post_top_head">{this.props.post.title}</h3>
                    <div className="content__post_top_body">{this.props.post.body}</div>
                </Link>
                {
                    this.props.user
                    ?
                    <p className="content__post_top_author">
                        <Link to={`/user/${this.props.user.id}`}
                              className="content__post_top_author_link">
                            {this.props.user.name} {this.props.user.surname}
                        </Link>
                    </p>
                    :
                    ''
                }
                <div className="content__post_top_info">
                    <span className="post_view">
                        <i className="fa fa-eye" aria-hidden="true"/> {this.props.post.views}
                    </span>&nbsp;
                    <div className="tooltip" id={`tooltip_${this.props.post.id}`}>
                         {this.state.tooltip}
                    </div>
                    <span className="post_like"
                          id={`post_id_${this.props.post.id}`}
                          onMouseEnter={() => {this.tooltipShow()}}
                          onMouseLeave={() => {this.timeout = setTimeout(this.tooltipHide, this.time)}}>
                             <i className="fa fa-heart" aria-hidden="true"/>
                             {this.props.post.likes === 0 ? '' : this.props.post.likes}
                    </span>
                </div>
            </div>
        )
    }

}