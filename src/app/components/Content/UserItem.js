import React from 'react';
import {Link} from 'react-router-dom';

import DeleteWindow from './DeleteWindow';

export default class UserItem extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            window: false
        };
        this.deleteWindowHide = this.deleteWindowHide.bind(this);
    }

    deleteWindowHide() {
        this.setState({
            window: false
        })
    }

    render() {
        return (
            <div className="user_item block_item">
                {this.state.window &&
                 <DeleteWindow id={this.props.user.id}
                               method={this.props.unsub}
                               hide={this.deleteWindowHide}
                               question={this.props.flag ? 'Отписаться от пользователя?' : 'Отписать пользователя?'}/>}
                <Link to={`/user/${this.props.user.id}`} className="user_item__ava">
                    <img src={this.props.user.avatar_path} className="user_item__ava__img"/>
                </Link>
                <Link to={`/user/${this.props.user.id}`} className="user_item__name">
                    {this.props.user.name} {this.props.user.surname}
                </Link><br/>
                {this.props.user.city &&
                <p className="user_item__info">
                    Город: {this.props.user.city}
                </p>}
                {this.props.user.age &&
                <p className="user_item__info">
                    Возраст: {this.props.user.age}
                </p>}
                {this.props.button === 'subs' &&
                <button className="button_custom button_subscribing"
                        onClick={() => {this.setState({window: true})}}>
                    Отписаться
                </button>}
                {this.props.button === 'subscribes' &&
                <button className="button_custom button_subscribing"
                        onClick={() => {this.setState({window: true})}}>
                    Отписать
                </button>}
            </div>
        )
    }
}