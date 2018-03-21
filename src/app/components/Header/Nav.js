import React from 'react';
//import {Link} from 'react-router';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component {
    constructor() {
        super(...arguments);
        this.headers = {
            '/': 'Добро пожаловать',
            '/posts': 'Все записи',
            '/blogs': 'Авторы блогов',
            '/about': 'О проекте',
            '/user': 'О авторе блога',
            '/post': 'Запись',
            '/login': 'Вход на сайт'
        }
    }

    isActive(href) {
        return window.location.pathname === href ? 'nav_menu__link_active' : '';
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
                    <NavLink exact to="/" className={`nav_menu__link ${this.isActive('/')}`}>Главная</NavLink>
                    <NavLink to="/posts" className={`nav_menu__link ${this.isActive('/posts')}`}>Записи</NavLink>
                    <NavLink to='/blogs' className={`nav_menu__link ${this.isActive('/blogs')}`}>Авторы</NavLink>
                    <NavLink to='/about' className={`nav_menu__link ${this.isActive('/about')}`}>О&nbsp;проекте</NavLink>
                    <NavLink to='login' className={`nav_menu__link ${this.isActive('/login')}`}>Вход на сайт</NavLink>
                </div>
                <NavLink to="/">
                    <h2 className="nav_header">Personal Blog</h2>
                </NavLink>
                <h2 className="nav_page_header">{this.headers[location]}</h2>
            </nav>
        )
    }

    componentDidMount() {
        document.querySelector('#nav_input').checked = true;
    }
}