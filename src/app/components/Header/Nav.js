import React from 'react';
import {Link} from 'react-router';

export default class Nav extends React.Component {
    constructor() {
        super(...arguments);
        this.headers = {
            '/': 'Добро пожаловать',
            '/posts': 'Записи',
            '/blogs': 'Блоги пользователей',
            '/about': 'О себе'
        }
    }

    isActive(href) {
        return window.location.pathname === href ? 'nav_menu__link_active' : '';
    }

    render() {
        return (
            <nav>
                <label htmlFor="nav_input" className="nav_header_label"><i className="fa fa-bars" aria-hidden="true"/></label>
                <input type="checkbox" id="nav_input"/>
                <div className="nav_menu">
                    <Link to="/" className={`nav_menu__link ${this.isActive('/')}`}>Главная</Link>
                    <Link to="/posts" className={`nav_menu__link ${this.isActive('/posts')}`}>Записи</Link>
                    <Link to='/blogs' className={`nav_menu__link ${this.isActive('/blogs')}`}>Блоги</Link>
                    <Link to='/about' className={`nav_menu__link ${this.isActive('/about')}`}>О&nbsp;себе</Link>
                </div>
                <Link to="/">
                    <h2 className="nav_header">Personal Blog</h2>
                </Link>
                <h2 className="nav_page_header">{this.headers[window.location.pathname]}</h2>
            </nav>
        )
    }

    componentDidMount() {
        document.querySelector('#nav_input').checked = true;
    }
}