import React from 'react';
import {Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="login"
                       className="label_custom">
                    Логин&nbsp;
                </label><br/>
                <Field component="input"
                       name="login"
                       id="login"
                       className="input_custom"
                       type="text"
                       required/><br/>
                <label htmlFor="password"
                       className="label_custom">
                    Пароль&nbsp;&nbsp;
                </label><br/>
                <Field component="input"
                       name="password"
                       id="password"
                       className="input_custom"
                       type="password"
                       required/><br/>
                <Field component="input"
                       type="checkbox"
                       id="remember_me"
                       name="remember_me"/>&nbsp;
                <label htmlFor="remember_me"
                       className="label_custom">
                    Запомнить меня
                </label><br/>
                <button type="submit"
                        className="button_custom button__enter_login">
                    Войти
                </button>
            </form>
        )
    }
}

LoginForm = reduxForm({
    form: 'Login'
})(LoginForm);

export default LoginForm;