import React from 'react';
import {connect} from 'react-redux';

import OpinionItem from '../components/Content/opinionItem';
import Loader from '../components/Content/Loader';
import OpinionForm from '../components/Content/forms/OpinionForm';

import {fetchLoginData} from "../actions/loginActions";
import {fetchOpinionsSample, addOpinion} from "../actions/opinionActions";

import {autoload} from '../componentsFunctions/autoload';
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";

@connect((store) => {
    return {
        login: store.login.login,

        opinions: store.opinions.opinions,
        is_opinions_fetching: store.opinions.is_fetching,
        opinions_empty: store.opinions.empty
    }
})
export default class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchOpinionsSample(0));

        this.state = {
            form: false
        };

        this.triggerForm = this.triggerForm.bind(this);
        this.addOpinion = this.addOpinion.bind(this);
    }

    triggerForm() {
        this.state.form
        ? this.setState({form: false})
        : this.setState({form: true});
    }

    addOpinion(values) {
        this.props.dispatch(addOpinion(values.name, this.props.login.id || null, values.body));
        this.triggerForm('form', false);
    }

    render() {

        let opinions = this.props.opinions.map((opinion, index) => {
            return <OpinionItem opinion={opinion}
                                key={index}/>
        });
        return (
            <div className="content_about">
                <h1 className="content_about_h2">О проекте</h1>
                <p className="content_about_p">
                    Приветствую тебя, уважаемый Гость!
                </p>
                <p className="content_about_p">В первую очередь стоит представиться. Меня зовут Алексей Гриценко, и я начинающий веб-разработчик. В данный момент больше ориентируюсь на frontend. </p>
                <p className="content_about_p">Данный сайт написан для того, чтобы продемонстрировать
                    мои скромные навыки, добавить его в портфолио и заодно, конечно же, набрать немного опыта.</p>
                <p className="content_about_p">Здесь Вы можете увидеть написанные пользователями посты, начиная с самого свежего, комментарии к ним, профили пользователей,
                    а если пройти простую регистрацию, то можно самостоятельно оставить какие-нибудь записи, прокомментировать чужие
                    записи или просто поставить лайк, а также подписаться на блоги других пользвателей. </p>
                <p className="content_about_p">Конечно же, идей еще хватает, но,
                    пока приложение находится в более-менее законченном виде, считаю нужным разместить его в сети,
                    чтобы можно было его кому-нибудь продемонстрировать.</p>
                <p className="content_about_p">
                    В данном приложении были использованы следующие технологии и инструменты:
                </p>
                <div className="content_about_p logo">
                    <div className="about_tool_div">
                        <img src="/img/html-css.png" className="about_tool_img_htmlcss"/>
                    </div>
                     <span className="about_tool_span">HTML5 и CSS3</span>
                </div>
                <div className="content_about_p logo">
                    <div className="about_tool_div">
                        <img src="/img/js.png" className="about_tool_img_js"/>
                    </div> <span className="about_tool_span">JavaScript (ES6)</span>
                </div>
                <div className="content_about_p logo">
                    <div className="about_tool_div">
                        <img src="/img/react.png" className="about_tool_img_react"/>
                    </div> <span className="about_tool_span">ReactJs (Redux)</span>
                </div>
                <div className="content_about_p logo">
                    <div className="about_tool_div">
                        <img src="/img/node.png" className="about_tool_img_node"/>
                    </div> <span className="about_tool_span">NodeJs (Express)</span>
                </div>
                <div className="content_about_p logo">
                    <div className="about_tool_div">
                        <img src="/img/mysql.png" className="about_tool_img_mysql"/>
                    </div> <span className="about_tool_span">MySQL</span>
                </div>
                <p className="content_about_p">Пользуйтесь в удовольствие и не забудьте оставить свой отзыв!</p>
                <h2 className="content_about_opinions_h2">Отзывы</h2>
                {this.state.form === false
                  ?  <button onClick={() => {this.triggerForm('form', true)}}
                            className="button_custom button_add_opinion">
                        Добавить пост
                    </button>
                  : <OpinionForm onSubmit={this.addOpinion}
                                 trigger={this.triggerForm}
                                 login={this.props.login}/>
                }
                {this.props.opinions.length !== 0 &&
                <div>{opinions}</div>}
                <span className="point"/>
                {this.props.is_opinions_fetching &&
                <Loader/>}
                <div className="link_to_up" onClick={() => {scrollTop()}}/>
            </div>
        )
    }

    componentDidMount() {
        scrollTop();
        $(document).off();
        $(document).on('scroll', () => {
            linkUp();
            autoload(this.props.is_opinions_fetching,
                     this.props.opinions_empty,
                     this.props.dispatch,
                     fetchOpinionsSample,
                     this.props.opinions.length)
        });
    }

}