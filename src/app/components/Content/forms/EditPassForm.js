import React from 'react';
import {Field, reduxForm } from 'redux-form';

class EditPassForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="edit_pass_form">
                <label htmlFor="password" className="label_custom">Старый пароль</label><br/>
                <Field component="input"
                       name="password"
                       id="password"
                       className="input_custom"
                       type="password"
                       required/> <span className="pass_incorrect">Неправильный пароль</span><br/>
                <label htmlFor="pass1" className="label_custom">Новый пароль</label><br/>
                <Field component="input"
                       name="pass1"
                       id="pass1"
                       className="input_custom"
                       type="password"
                       required/><br/>
                <label htmlFor="pass2" className="label_custom">Повтор нового пароля</label><br/>
                <Field component="input"
                       name="pass2"
                       id="pass2"
                       className="input_custom"
                       type="password"
                       required/> <span className="pass_mismatch">Пароли не совпадают</span> <br/>
                <button type="submit"
                        className="button_custom button_custom__save">
                    Сохранить
                </button>
                <button onClick={() => {this.props.trigger('info', 'info')}}
                        className="button_custom button_custom__cansel">
                    Отмена
                </button>
            </form>
        )
    }
}

EditPassForm = reduxForm({
    form: 'EditPass'
})(EditPassForm);

export default EditPassForm;