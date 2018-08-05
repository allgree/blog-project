import React from 'react';

import Loader from '../components/Content/Loader';
import UserItem from '../components/Content/UserItem';
import SearchFrom from '../components/Content/forms/SearchForm';

import {connect} from 'react-redux';

import {fetchUsersSample} from "../actions/usersListActions";
import {fetchLoginData} from "../actions/loginActions";
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";

@connect((store) => {

    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,
        users_empty: store.usersList.empty,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Blogs extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
           val1: '',
           val2: ''
        };
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchUsersSample(0, '', ''));
        this.data = this.data.bind(this);
    }

    data(form_value) {
        if (!form_value) {
            this.props.dispatch(fetchUsersSample(0, '', ''));
            return;
        }
        let values = form_value.split(' ').map((value, i) => {
            if (value !== '') return value;
        });
        this.setState({
           val1: values[0] || null,
           val2: values[1] || null
        });
        this.props.dispatch(fetchUsersSample(0, this.state.val1, this.state.val2))
    }

    render() {
        let users = [];
        if (this.props.users) {
            users = this.props.users.map((user, index) => {
                return <UserItem key={index}
                                 user={user}
                                 button={false}/>
            });
        }

        return (
            <div className="content_blogs">
                <SearchFrom data={this.data}
                            placeholder={'Введите имя и фамилию'}/>
                    {this.props.users !== 0 &&
                       <div>{users}</div>}
                <span className="point"/>
                {this.props.is_users_fetching &&
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

            // автоподгрузка
            let $point = $('.point');
            if (!$point[0]) {
                return;
            }
            let point = $point.offset().top;          // точка где заканчиваются новые записи
            let scroll_top = $(document).scrollTop(); //Насколько прокручена страница сверху (без учета высоты окна)
            let height = $(window).height();   // Высота окна
            let load_flag = scroll_top + height >= point;   // Флаг подгружаем ли данные
            if (load_flag && !this.props.is_users_fetching && !this.props.users_empty) {
                console.log('autoload, users.lenght', this.props.users.length);
                this.props.dispatch(fetchUsersSample(this.props.users.length, this.state.val1, this.state.val2));
            }

        });
    }
}