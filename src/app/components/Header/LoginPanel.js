import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

@connect((store) => {
    return {
        login: store.login.login,
    }
})
export default class LoginPanel extends React.Component {
    constructor() {
        super(...arguments);
    }

    render() {
        if (Object.keys(this.props.login).length === 0) {
            return <div className="login__links">
                <NavLink to='/login' className={`nav_menu__link login__link`}>Вход на сайт</NavLink>
                <NavLink to='/register' className={`nav_menu__link login__link`}>Регистрация</NavLink>
            </div>
        } else {
            return <div className="login__links">
                <span>{this.props.login.login}</span>
                <NavLink to='/cabinet' className={`nav_menu__link login__link`}>Личный кабинет</NavLink>
                <NavLink to='/unlogged' className={`nav_menu__link login__link`}>Выход</NavLink>
            </div>
        }
    }
}
