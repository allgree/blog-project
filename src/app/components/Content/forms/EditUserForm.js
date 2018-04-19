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
            <form onSubmit={this.props.handleSubmit} className="edit_user_form">
                <label htmlFor="login" className="label_custom">Логин</label><br/>
                <Field component="input"
                       name="login"
                       id="login"
                       className="input_custom"
                       type="text"
                       required
                /><br/>
                <label htmlFor="name" className="label_custom">Имя</label><br/>
                <Field component="input"
                       name="name"
                       id="name"
                       className="input_custom"
                       type="text"
                       required
                /><br/>
                <label htmlFor="surname" className="label_custom">Фамилия</label><br/>
                <Field component="input"
                       name="surname"
                       id="surname"
                       className="input_custom"
                       type="text"
                       required
                /><br/>
                <label htmlFor="city" className="label_custom">Город</label><br/>
                <Field component="input"
                       name="city"
                       id="city"
                       className="input_custom"
                       type="text"
                /><br/>
                <label htmlFor="age" className="label_custom">Возраст</label><br/>
                <Field component="input"
                       name="age"
                       id="age"
                       className="input_custom"
                       type="text"
                /><br/>
                <label htmlFor="site" className="label_custom">Веб-сайт</label><br/>
                <Field component="input"
                       name="site"
                       id="site"
                       className="input_custom"
                       type="text"
                /><br/>
                <label htmlFor="email" className="label_custom">Электронная почта</label><br/>
                <Field component="input"
                       name="email"
                       id="email"
                       className="input_custom"
                       type="email"
                /><br/>
                <button type="submit"
                        className="button_custom button_custom__save">
                    Сохранить
                </button>
                <button onClick={() => {this.props.click('info')}}
                        className="button_custom button_custom__cansel">
                    Отмена
                </button>
            </form>
        )
    }
}

EditUserForm = reduxForm({
    form: 'EditUser'
})(EditUserForm);

export default EditUserForm;