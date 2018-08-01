import React from 'react';
import {Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
    submit() {
        this.props.reset();
        this.props.handleSubmit();
    }

    render() {
        return (
            <form className="comment_form">
                <Field component="textarea"
                       name="body"
                       cols="110"
                       rows="10"
                       id="comment_body"
                       className="input_custom"
                       required/>
                <br/>
                <button onClick={() => {this.submit()}}
                        className="button_custom button_custom__save">
                         Сохранить
                </button>
                <button onClick={() => {this.props.trigger()}}
                        className="button_custom button_custom__cansel">
                    Отмена
                </button>
            </form>
        )
    }
}

CommentForm = reduxForm({
    form: 'Comment'
})(CommentForm);

export default CommentForm;