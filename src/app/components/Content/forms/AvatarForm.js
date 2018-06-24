import React from 'react';


export default class AvatarForm extends React.Component {
    constructor() {
        super(...arguments);
        this.files = [];
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.change = this.change.bind(this);
    }


    onFormSubmit(e) {
        e.preventDefault();
        this.props.changeAvatar(this.files);
    }

    change(e) {
        e.preventDefault();
        this.files = e.target.files;
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="avatar_form">
                <label htmlFor="avatar" className="button_custom label_upload_avatar">
                    Загрузить изображение
                </label>
                <div className="div_for_input_avatar">
                    <input name="avatar" type="file" id="avatar" onChange={this.change}/>
                </div>
                <button type="submit"
                        className="button_custom button_custom__save">
                    Сохранить
                </button>
                <button onClick={() => {this.props.trigger('avatar', 'button')}}
                        className="button_custom button_custom__cansel">
                    Отмена
                </button>
            </form>
        )
    }
}
