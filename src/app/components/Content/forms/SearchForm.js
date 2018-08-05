import React from 'react';

export default class SearchForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="search_form">
                <input type="text"
                       id="search"
                       className="input_custom"
                       placeholder={this.props.placeholder}/>
            </form>
        )
    }

    componentDidMount() {
        let search = this.props.search;
        document.querySelector('#search').oninput = function () {
            search(this.value);
        }
    }

}