import React from 'react';
import {NavLink} from 'react-router-dom';

import LoginPanel from './LoginPanel';

export default class Nav extends React.Component {
    constructor() {
        super(...arguments);
        this.headers = {
            '/': 'Добро пожаловать',
            '/posts': 'Все записи',
            '/blogs': 'Авторы блогов',
            '/ratings': 'Рейтинги',
            '/about': 'О проекте',
            '/user': 'О авторе блога',
            '/post': 'Запись',
            '/login': 'Вход на сайт',
            '/cabinet': 'Личный кабинет',
            '/register': 'Регистрация',
        }
    }

    render() {
        let location = window.location.pathname;
        let arr_path = location.split('/');
        if (/[\d]/g.test(arr_path[arr_path.length - 1])) {
            let count = arr_path[arr_path.length - 1].length + 1;
            location = location.slice(0, -(count));
        }
        return (
            <nav>
                <label htmlFor="nav_input" className="nav_header_label"><i className="fa fa-bars" aria-hidden="true"/></label>
                <input type="checkbox" id="nav_input"/>
                <div className="nav_menu">
                    <NavLink exact to="/" className='nav_menu__link'>Главная</NavLink>
                    <NavLink to="/posts" className='nav_menu__link'>Записи</NavLink>
                    <NavLink to='/blogs' className='nav_menu__link'>Авторы</NavLink>
                    <NavLink to='/ratings' className='nav_menu__link'>Рейтинги</NavLink>
                    <NavLink to='/about' className='nav_menu__link'>О&nbsp;проекте</NavLink>
                </div>
                <NavLink to="/">
                    <h2 className="nav_header">Personal Blog</h2>
                </NavLink>
                <h2 className="nav_page_header">{this.headers[location]}</h2>
                <LoginPanel/>
            </nav>
        )
    }

    componentDidMount() {
        console.log(document.body.offsetWidth);
        document.querySelector('#nav_input').checked = true;
    }
}