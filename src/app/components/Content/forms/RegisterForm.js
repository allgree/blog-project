import React from 'react';
import {Field, reduxForm } from 'redux-form';

class RegisterForm extends React.Component {
    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} encType="multipart/form-data">
                <label htmlFor="login"
                       className="label_custom">
                    Логин
                </label><br/>
                <Field component="input"
                       name="login"
                       id="login"
                       className="input_custom"
                       type="text"
                       required
                       /><br/>
                <label htmlFor="name"
                       className="label_custom">
                    Имя
                </label><br/>
                <Field component="input"
                       name="name"
                       id="name"
                       className="input_custom"
                       type="text"
                       required
                       /><br/>
                <label htmlFor="surname"
                       className="label_custom">
                    Фамилия
                </label><br/>
                <Field component="input"
                       name="surname"
                       id="surname"
                       className="input_custom"
                       type="text"
                       required
                       /><br/>
                <label htmlFor="city"
                       className="label_custom">
                    Город
                </label><br/>
                <Field component="input"
                       name="city"
                       id="city"
                       className="input_custom"
                       type="text"
                       /><br/>
                <label htmlFor="age"
                       className="label_custom">
                    Возраст
                </label><br/>
                <Field component="input"
                       name="age"
                       id="age"
                       className="input_custom"
                       type="text"
                       /><br/>
                <label htmlFor="site"
                       className="label_custom">
                    Веб-сайт
                </label><br/>
                <Field component="input"
                       name="site"
                       id="site"
                       className="input_custom"
                       type="text"
                       /><br/>
                <label htmlFor="email"
                       className="label_custom">
                    Электронная почта
                </label><br/>
                <Field component="input"
                       name="email"
                       id="email"
                       className="input_custom"
                       type="email"
                       /><br/>
                <label htmlFor="pass1"
                       className="label_custom">
                    Пароль
                </label><br/>
                <Field component="input"
                        name="pass1"
                        id="pass1"
                        className="input_custom"
                        type="password"
                        required
                        /><br/>
                <label htmlFor="pass2"
                       className="label_custom">
                    Повтор пароля
                </label><br/>
                <Field component="input"
                       name="pass2"
                       id="pass2"
                       className="input_custom"
                       type="password"
                       required
                /><br/>
                <button type="submit"
                        className="button_custom button__register">
                    Зарегистрироваться
                </button>
            </form>
        )
    }
}

RegisterForm = reduxForm({
    form: 'Register'
})(RegisterForm);

export default RegisterForm;