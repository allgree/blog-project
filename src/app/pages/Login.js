import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../components/Content/LoginForm';

import {connect} from 'react-redux';

import {fetchLogin} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.login = this.login.bind(this);
    }

    login(values) {
        this.props.dispatch(fetchLogin(values));
    }

    render() {
        if (Object.keys(this.props.login).length !== 0) {
            return <Redirect to="/"/>
        }
        return (
            <div className="content__login">
                <LoginForm onSubmit={this.login}/>
            </div>
            )
    }
}