import React from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import {unlogged} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})

export default class Unlogged extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(unlogged(this.props.login));
    }

    render() {
        if (Object.keys(this.props.login).length === 0) {
            return <Redirect to="/"/>
        }
        return (
            <h2>Error!</h2>
        )
    }
}