import React from 'react';
import {Link} from 'react-router-dom';

export default class UserTop extends React.Component {
    render() {
        return (
            <Link to={`/user/${this.props.user.id}`} className="content__top_user_item block_item">
                <p className="user_top_ava">
                    <img src={this.props.user.avatar_path} className="user_item__ava__img"/>
                </p>
                <h3 className="user_top__item__author">{this.props.user.name} {this.props.user.surname}</h3>
                <p className="user_top__item__city">Город: {this.props.user.city}</p>
                <p className="user_top__item__info">
                    {this.props.user.posts_count
                        ?
                        'Количество постов: ' + this.props.user.posts_count + '.'
                        :
                        'Количество комментариев: ' + this.props.user.comments_count + '.'}
                </p>
            </Link>
        )
    }
}