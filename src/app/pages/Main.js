import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';


export default class Main extends React.Component {
    constructor() {
        super(...arguments);

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