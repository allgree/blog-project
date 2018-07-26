import React from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import RegisterForm from '../components/Content/forms/RegisterForm';
import {registerUser} from "../actions/usersListActions";
import {fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login
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
        if (Object.keys(this.props.login).length !== 0) {
            return <Redirect to="/"/>
        }
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