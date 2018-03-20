import React from 'react';
import {Link} from 'react-router-dom';

export default class UserItem extends React.Component {
    render() {
        return (
            <Link to={`/user/${this.props.user.id}`} className="user_item">
                <div className="user_item__ava">
                    <img src={this.props.user.avatar_path} className="user_item__ava__img"/>
                </div>
                <h3 className="user_item__name">{this.props.user.name} {this.props.user.surname}</h3>
                <p className="user_item__info">Город: {this.props.user.city}</p>
                <p className="user_item__info">Возраст: {this.props.user.age}</p>
            </Link>
        )
    }
}