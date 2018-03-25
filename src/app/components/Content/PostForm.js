import React from 'react';
import {Field, reduxForm } from 'redux-form';

class PostForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="post_title">Тема: </label>
                <Field component="input"
                       name="title"
                       type="text"
                       id="post_title"
                       required/>
                <br/>
                <Field component="textarea"
                       name="body"
                       id="post_body"
                       cols="110"
                       rows="10"
                       required/>
                <br/>
                <button type="submit">
                    Сохранить запись
                </button>
            </form>
        )
    }
}

PostForm = reduxForm({
    form: 'Post'
})(PostForm);

export default PostForm;