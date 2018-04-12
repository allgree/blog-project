import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
    }

    render() {
        return (
            <div className="content__main">
                <div className="content__welcome block_item">
                    <h2>Добро пожаловать в Ваш Персональный Блог!</h2>
                </div>
                <Link to="/posts" className="content__main__link block_item">Записи</Link>
                <Link to="/blogs" className="content__main__link block_item">Авторы</Link>
                <Link to="/ratings" className="content__main__link block_item">Рейтинги</Link>
                <Link to="/about" className="content__main__link block_item">О проекте</Link>
            </div>
        )
    }
}