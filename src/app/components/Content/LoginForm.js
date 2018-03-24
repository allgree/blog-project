import React from 'react';
import {Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="login">Логин&nbsp;</label><br/>
                <Field component="input" name="login" id="login" type="text" required/><br/>
                <label htmlFor="password">Пароль&nbsp;&nbsp;</label><br/>
                <Field component="input" name="password" id="password" type="password" required/><br/>
                <button type="submit">Войти</button>
            </form>
        )
    }
}

LoginForm = reduxForm({
    form: 'Login'
})(LoginForm);

export default LoginForm;