import React from 'react';


export default class AvatarForm extends React.Component {
    constructor() {
        super(...arguments);
        this.files = [];
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.change = this.change.bind(this);
    }


    change(e) {
        e.preventDefault();
        this.files = e.target.files;
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.changeAvatar(this.files);
    }


    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="avatar_form">
                <label htmlFor="avatar" className="button_custom label_upload_avatar">
                    Выбрать изображение
                </label>
                <div className="div_for_input_avatar">
                    <input name="avatar" type="file" id="avatar" onChange={this.change}/>
                </div>
                <button type="submit"
                        className="button_custom button_custom__save">
                    Сохранить
                </button>
                <button onClick={() => {this.props.trigger(this.props.state_param, this.props.state_value)}}
                        className="button_custom button_custom__cansel">
                    Отмена
                </button>
                <p className="image_name"/>
                <p className="caution_incorrect_format"/>
            </form>
        )
    }

    componentDidMount() {
        let types = this.props.extensions;
        document.getElementById('avatar').onchange = function () {
            let name = this.value.split('/').pop().split('\\').pop();
            if (!name) return;
            document.querySelector('.image_name').innerHTML = `Выбрано изображение: ${name}`;
            let type = name.split('.').pop();
            if (types.indexOf(type) === -1) {
                document.querySelector('.caution_incorrect_format').innerHTML = 'Неправильный тип изображения';
            } else {
                document.querySelector('.caution_incorrect_format').innerHTML = '';
            }
        };
    }
}
