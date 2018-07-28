import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../components/Content/forms/LoginForm';

import {connect} from 'react-redux';

import {fetchLogin, fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.login = this.login.bind(this);
    }

    login(values) {
        let incorrect_caution = document.querySelector('.login_incorrect');
        incorrect_caution.style.display = 'none';
        this.props.dispatch(fetchLogin(values));
        if (!this.props.login.id) incorrect_caution.style.display = 'inline';
    }

    render() {
        if (this.props.login.id) {
            return <Redirect to="/cabinet"/>
        }

        return (
            <div className="content__login">
                <LoginForm onSubmit={this.login}/>
            </div>
            )
    }
}