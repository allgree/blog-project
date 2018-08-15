import React from 'react';
import {Redirect} from 'react-router-dom';

import {fetchLoginData} from "../actions/loginActions";

import {connect} from 'react-redux';

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})

export default class RefreshCabinet extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
    }

    render() {
        if (this.props.login.id) {
            return <Redirect to="/cabinet"/>
        } else {
            return null;
        }
    }
}
