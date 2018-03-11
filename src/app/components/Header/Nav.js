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

    render() {
        return (
            <nav>
                <label htmlFor="nav_input" className="nav_header_label"><i className="fa fa-bars" aria-hidden="true"/></label>
                <input type="checkbox" id="nav_input"/>
                <div className="nav_menu">
                    <Link to="/posts" className="nav_menu__link">Записи</Link>
                    <Link to='/blogs' className="nav_menu__link">Блоги</Link>
                    <Link to='/about' className="nav_menu__link">О себе</Link>
                </div>
                <Link to="/">
                    <h2 className="nav_header">Личный блог</h2>
                </Link>
                <h2 className="nav_page_header">{this.headers[window.location.pathname]}</h2>
            </nav>
        )
    }

    componentDidMount() {
        document.querySelector('#nav_input').checked = true;
    }
}