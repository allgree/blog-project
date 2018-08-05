import React from 'react';

export default class SearchForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="search_user_form">
                <input type="text"
                       id="user"
                       className="input_custom"
                       placeholder={this.props.placeholder}/>
            </form>
        )
    }

    componentDidMount() {
        let data = this.props.data;
        document.querySelector('#user').oninput = function () {
            data(this.value);
        }
    }

}