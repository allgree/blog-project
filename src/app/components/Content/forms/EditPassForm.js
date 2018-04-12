import React from 'react';
import {Field, reduxForm } from 'redux-form';

class EditPassForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="password">Старый пароль</label><br/>
                <Field component="input"
                       name="password"
                       id="password"
                       type="password"
                       required/> <span className="pass_incorrect">Неправильный пароль</span><br/>
                <label htmlFor="pass1">Новый пароль</label><br/>
                <Field component="input"
                       name="pass1"
                       id="pass1"
                       type="password"
                       required/><br/>
                <label htmlFor="pass2">Повтор нового пароля</label><br/>
                <Field component="input"
                       name="pass2"
                       id="pass2"
                       type="password"
                       required/> <span className="pass_mismatch">Пароли не совпадают</span> <br/>
                <button type="submit">Сохранить</button>
                <button onClick={() => {this.props.click('info')}}>Отмена</button>
            </form>
        )
    }
}

EditPassForm = reduxForm({
    form: 'EditPass'
})(EditPassForm);

export default EditPassForm;