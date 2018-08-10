import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

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
            register: false,
            valid_login: true,
            valid_pass: true,
        }
    }

    // зарегистрировать пользователя
    register(values) {
        this.setState({valid_login: true});
        this.setState({valid_pass: true});
        axios.get(`/api/login/check-login/?login=${values.login}`).then(result => {
            if (result.data === 0) {
                this.setState({valid_login: false});
                return;
            }
            if (values.pass1 !== values.pass2) {
                this.setState({valid_pass: false});
                return;
            }
            this.props.dispatch(registerUser(values));
            this.setState({
                register: true
            });
        });
    }

    render() {
        if (this.props.login.id) {
            return <Redirect to="/"/>
        }
        if (this.state.register) {
            return (
                <Redirect to="/login"/>
            )
        }
        return (
            <div className="content__register">
                <RegisterForm onSubmit={this.register}
                              valid_login={this.state.valid_login}
                              valid_pass={this.state.valid_pass}/>
            </div>
        )
    }
}