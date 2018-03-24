import React from 'react';
import {Field, reduxForm } from 'redux-form';

class CommentForm extends React.Component {
    submit() {
        this.props.reset();
        this.props.handleSubmit();
    }

    render() {
        return (
            <form>
                <Field component="textarea"
                       name="body"
                       cols="110"
                       rows="10"
                       id="comment_body"
                       required/>
                <br/>
                   <button onClick={() => {this.submit()}}>
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