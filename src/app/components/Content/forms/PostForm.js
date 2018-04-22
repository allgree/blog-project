import React from 'react';
import {Field, reduxForm } from 'redux-form';

class PostForm extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit} className="post_form">
                    <label htmlFor="post_title"
                           className="label_custom">
                        Тема: </label>
                    <Field component="input"
                           name="title"
                           type="text"
                           id="post_title"
                           className="input_custom"
                           required/>
                    <br/>
                    <Field component="textarea"
                           name="body"
                           id="post_body"
                           className="input_custom"
                           cols="110"
                           rows="10"
                           required/>
                    <br/>
                    <button type="submit"
                            className="button_custom button_custom__save">
                        Сохранить запись
                    </button>
                    <button onClick={() => {this.props.click('button')}}
                            className="button_custom button_custom__cansel">
                        Отмена
                    </button>
                </form>

            </div>

        )
    }
}

PostForm = reduxForm({
    form: 'Post'
})(PostForm);

export default PostForm;