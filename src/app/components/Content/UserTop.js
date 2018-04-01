import React from 'react';
//import {Link} from 'react-router';
import {Link} from 'react-router-dom';

export default class UserTop extends React.Component {
    render() {
        return (
            <Link to={`/user/${this.props.user.id}`} className="content__top_user_item block_item">
                <h3>{this.props.user.name} {this.props.user.surname}</h3>
                <p>Город: {this.props.user.city}</p>
                <p>Количество {
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