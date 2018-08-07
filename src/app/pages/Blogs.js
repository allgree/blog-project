import React from 'react';

import Loader from '../components/Content/Loader';
import UserItem from '../components/Content/UserItem';
import SearchFrom from '../components/Content/forms/SearchForm';

import {connect} from 'react-redux';

import {fetchUsersSample} from "../actions/usersListActions";
import {fetchLoginData} from "../actions/loginActions";
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";
import {searchUsers} from "../componentsFunctions/searchUsers";

import {autoloadWithSearch} from '../componentsFunctions/autoloadWithSearch';

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
        this.search = this.search.bind(this);
    }

    // обработка строки поиска
    search(form_value) {
        searchUsers(form_value, this, fetchUsersSample);
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
                <SearchFrom search={this.search}
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
            autoloadWithSearch(this.props.is_users_fetching,
                               this.props.users_empty,
                               this.props.dispatch,
                               fetchUsersSample,
                               this.props.users.length,
                               this.state.val1,
                               this.state.val2)
        });
    }
}