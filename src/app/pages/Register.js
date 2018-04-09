import React from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import RegisterForm from '../components/Content/forms/RegisterForm';
import {registerUser} from "../actions/usersListActions";
import {fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        users: store.usersList.users,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Register extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.register = this.register.bind(this);
        this.state = {
            register: false
        }
    }

    register(values) {
        if (values.pass1 === values.pass2) {
            this.props.dispatch(registerUser(values));
            this.setState({
                register: true
            })
        }
    }

    render() {
        if (this.state.register) {
            return (
                <Redirect to="/login"/>
            )
        }
        return (
            <div className="content__register">
                <RegisterForm onSubmit={this.register}/>
            </div>
        )
    }
}