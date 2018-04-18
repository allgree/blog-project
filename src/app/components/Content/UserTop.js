import React from 'react';
import {Link} from 'react-router-dom';

export default class UserTop extends React.Component {
    render() {
        return (
            <Link to={`/user/${this.props.user.id}`} className="content__top_user_item block_item">
                <h3 className="user_top__item__author">{this.props.user.name} {this.props.user.surname}</h3>
                <p className="user_top__item__city">Город: {this.props.user.city}</p>
                <p className="user_top__item__info">Количество {
                    this.props.user.count_posts
                        ?
                        'постов: ' + this.props.user.count_posts + '.'
                        :
                        'комментариев: ' + this.props.user.count_comments + '.'
                                }
                </p>
            </Link>
        )
    }
}