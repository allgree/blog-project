import React from 'react';

export default class UserProfile extends React.Component {
    render() {
        return (
            <div className="user_profile">
                <h2 className="content__cabinet__login_name">{this.props.login.name} {this.props.login.surname}</h2>
                {this.props.login.city &&
                <p className="content__cabinet__login_info">Город: {this.props.login.city}</p>}
                {this.props.login.age &&
                <p className="content__cabinet__login_info">Возраст: {this.props.login.age}</p>}
                {this.props.login.email &&
                <p className="content__cabinet__login_info">
                    Email: <a href={`mailto:${this.props.login.email}`}
                              className="login_info_link">
                                {this.props.login.email}
                            </a>
                </p>}
                {this.props.login.site &&
                <p className="content__cabinet__login_info">
                    Веб-сайт: <a href={`http://${this.props.login.site}`}
                                 target="_blank"
                                 className="login_info_link">
                                    {this.props.login.site}
                              </a>
                </p>}
                <button className="button_custom button_edit_profile"
                        onClick={() => {this.props.trigger('info', 'form')}}>
                    Редактировать профиль
                </button>
                <br/>
                <button className=" button_custom button_edit_password"
                        onClick={() => {this.props.trigger('info', 'pass')}}>
                    Сменить пароль
                </button>
            </div>
        )
    }
}