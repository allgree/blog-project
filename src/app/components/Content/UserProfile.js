import React from 'react';

export default class UserProfile extends React.Component {
    render() {
        return (
            <div className="user_info">
                <div className="content__user_ava_div">
                    <img src={this.props.user.avatar_path} className="big_avatar"/>
                </div>
                <h2 className="content__user_name">
                    {this.props.user.name} {this.props.user.surname}
                </h2>
                {this.props.user.city &&
                <p className="content__user_info">
                    Город: {this.props.user.city}
                </p>}
                {this.props.user.age &&
                <p className="content__user_info">
                    Возраст: {this.props.user.age}
                </p>}
                {this.props.user.email &&
                <p className="content__user_info">
                    Email: <a href={`mailto:${this.props.user.email}`}
                              className="user_info__link">
                    {this.props.user.email}
                    </a>
                </p>}
                {this.props.user.site &&
                <p className="content__user_info">
                    Веб-сайт: <a href={`http://${this.props.user.site}`}
                                 target="_blank"
                                 className="user_info__link">
                    {this.props.user.site}
                    </a>
                </p>}
                {this.props.followers.find(item => item.user.id === this.props.login.id)
                    ? <button className="button_custom button_subscribing"
                              onClick={() => {this.props.unsubscript()}}>
                        Отписаться
                    </button>
                    : this.props.login.id &&
                    <button className="button_custom button_subscribing"
                            onClick={() => {this.props.subscript()}}>
                        Подписаться
                    </button>}

            </div>
        )
    }
}