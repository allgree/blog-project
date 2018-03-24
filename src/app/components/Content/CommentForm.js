import React from 'react';
import {Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} id="comment">
                <Field component="textarea"
                       name="body"
                       cols="110"
                       rows="10"
                       id="comment_body"
                       required/>
                <br/>
                <button type="submit">
                            Добавить комментарий
                </button>
            </form>
        )
    }
}

CommentForm = reduxForm({
    form: 'Comment'
})(CommentForm);

export default CommentForm;