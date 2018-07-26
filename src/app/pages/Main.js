import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login
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
                    <h2>Добро пожаловать{this.props.login.name && <span>, {this.props.login.name}</span>}!</h2>
                    {!this.props.login.id && <div>
                        <p className="content_main_p">Здесь вы можете завести личный блог и делиться своими мыслями со всеми!</p>
                        <Link to='/login' className='main_welcome_link'>Войти</Link>
                        <Link to='/register' className='main_welcome_link'>Зарегистрироваться</Link>
                    </div>}
                </div>
                <Link to="/posts" className="content__main__link block_item">
                    <p>Записи</p>
                    <p className="content_main_p">
                        Просматривайте последние записи пользователей!
                    </p>
                </Link>
                <Link to="/blogs" className="content__main__link block_item">
                    <p>Авторы</p>
                    <p className="content_main_p">
                        Заходите на блоги других пользователей!
                    </p>
                </Link>
                <Link to="/ratings" className="content__main__link block_item">
                    <p>Рейтинги</p>
                    <p className="content_main_p">
                        Просматривайте рейтинги сайта!
                    </p>
                </Link>
                <Link to="/about" className="content__main__link block_item">
                    <p>О проекте</p>
                    <p className="content_main_p">
                        Узнайте более подробную информацию о сайте!
                    </p>
                </Link>
            </div>
        )
    }
}