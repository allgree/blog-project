import React from 'react';
import {Field, reduxForm } from 'redux-form';

class RegisterForm extends React.Component {
    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} encType="multipart/form-data">
                <label htmlFor="login">Логин</label><br/>
                <Field component="input"
                       name="login"
                       id="login"
                       type="text"
                       required
                       /><br/>
                <label htmlFor="name">Имя</label><br/>
                <Field component="input"
                       name="name"
                       id="name"
                       type="text"
                       required
                       /><br/>
                <label htmlFor="surname">Фамилия</label><br/>
                <Field component="input"
                       name="surname"
                       id="surname"
                       type="text"
                       required
                       /><br/>
                <label htmlFor="city">Город</label><br/>
                <Field component="input"
                       name="city"
                       id="city"
                       type="text"
                       /><br/>
                <label htmlFor="age">Возраст</label><br/>
                <Field component="input"
                       name="age"
                       id="age"
                       type="text"
                       /><br/>
                <label htmlFor="site">Веб-сайт</label><br/>
                <Field component="input"
                       name="site"
                       id="site"
                       type="text"
                       /><br/>
                <label htmlFor="email">Электронная почта</label><br/>
                <Field component="input"
                       name="email"
                       id="email"
                       type="email"
                       /><br/>
                <label htmlFor="pass1">Пароль</label><br/>
                <Field component="input"
                        name="pass1"
                        id="pass1"
                        type="password"
                       required
                        /><br/>
                <label htmlFor="pass2">Повтор пароля</label><br/>
                <Field component="input"
                       name="pass2"
                       id="pass2"
                       type="password"
                       required
                /><br/>
                <button type="submit">Зарегистрироваться</button>
            </form>
        )
    }
}

RegisterForm = reduxForm({
    form: 'Register'
})(RegisterForm);

export default RegisterForm;