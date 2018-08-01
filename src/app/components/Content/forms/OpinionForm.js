import React from 'react';
import {Field, reduxForm } from 'redux-form';

class OpinionForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="opinion_form">
                {!this.props.login.id &&
                <div>
                    <label htmlFor="name"
                            className="label_custom label_name_opinion">
                        Ваше имя
                    </label>
                    <Field component="input"
                           name="name"
                           type="text"
                           id="name"
                           className="input_custom"
                           required/>
                </div>}
                <Field component="textarea"
                       name="body"
                       id="body"
                       cols="110"
                       rows="10"
                       className="input_custom"
                       maxLength="200"
                       required/>
                <br/>
                <button type="submit"
                        className="button_custom button_custom__save">
                    Сохранить отзыв
                </button>
                <button onClick={() => {this.props.trigger()}}
                        className="button_custom button_custom__cansel">
                    Отмена
                </button>
            </form>
        )
    }
}

OpinionForm = reduxForm({
    form: 'Opinion'
})(OpinionForm);

export default OpinionForm;