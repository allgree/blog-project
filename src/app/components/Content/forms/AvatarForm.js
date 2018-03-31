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
            <form onSubmit={this.onFormSubmit}>
                <input name="avatar" type="file" id="avatar" onChange={this.change}/>
                <button type="submit">Сохранить</button>
            </form>
        )
    }
}
