import React from 'react';
import {NavLink} from 'react-router-dom';

import LoginPanel from './LoginPanel';

export default class Nav extends React.Component {
    constructor() {
        super(...arguments);
        this.location = '';
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

    // определить роут страницы
    getLocation() {
        let location = window.location.pathname;
        let last_value = location.split('/').pop();
        if (/[\d]/g.test(last_value)) {
            let count = last_value.length + 1;
            location = location.slice(0, -(count));
        }
        return location;
    }

    // показать/скрыть боковое меню навигации
    showOrHideSideMenu() {
        ['/','/login','/register'].indexOf(this.location) === -1
            ?  document.querySelector('#nav_input').checked = true
            :  document.querySelector('#nav_input').checked = false
    }

    render() {
        this.location = this.getLocation();
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
                <h2 className="nav_page_header">{this.headers[this.location]}</h2>
                <LoginPanel/>
            </nav>
        )
    }

    componentDidMount() {
        this.showOrHideSideMenu()
    }

    componentDidUpdate() {
        this.showOrHideSideMenu()
    }
}