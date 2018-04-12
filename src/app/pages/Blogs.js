import React from 'react';

import Loader from '../components/Content/Loader';
import UserItem from '../components/Content/UserItem';

import {connect} from 'react-redux';

import {fetchUsersSample} from "../actions/usersListActions";
import {fetchLoginData} from "../actions/loginActions";
import {autoload} from '../functions/autoload';

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
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchUsersSample(0));
    }
    render() {
        let users = this.props.users.map((user, index) => {
           return <UserItem key={index}
                            user={user}/>
        });
        return (
            <div className="content_blogs">
                    {this.props.users.length !== 0 &&
                       <div>{users}</div>}
                <span className="point"/>
                {this.props.is_users_fetching &&
                <Loader/>}
            </div>
        )
    }

    componentDidMount() {
        $(document).off();
        $(document).on('scroll', () => {
            autoload(this.props.is_users_fetching,
                     this.props.users_empty,
                     this.props.dispatch,
                     fetchUsersSample,
                     this.props.users.length)
        });
    }
}