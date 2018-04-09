import React from 'react';
import {connect} from 'react-redux';

import {fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
    }

    render() {
        return (
            <div className="content_about">
                <h1>About</h1>
            </div>
        )
    }
}