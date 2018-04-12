import React from 'react';
import {Field, reduxForm } from 'redux-form';

class EditUserForm extends React.Component {
    componentWillMount() {
        this.props.initialize({
            login: this.props.login.login,
            name: this.props.login.name,
            surname: this.props.login.surname,
            city: this.props.login.city,
            age: this.props.login.age,
            site: this.props.login.site,
            email: this.props.login.email
        })
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
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
                <button type="submit">Сохранить</button>
                <button onClick={() => {this.props.click('info')}}>Отмена</button>
            </form>
        )
    }
}

EditUserForm = reduxForm({
    form: 'EditUser'
})(EditUserForm);

export default EditUserForm;