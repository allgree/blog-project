import React from 'react';
import {Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="comment_form">
                <Field component="textarea"
                       name="body"
                       cols="110"
                       rows="10"
                       id="comment_body"
                       className="input_custom textarea_custom"
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