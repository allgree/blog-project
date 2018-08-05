import React from 'react';
import {Redirect} from 'react-router-dom';


import Loader from '../components/Content/Loader';

import {connect} from 'react-redux';

import {fetchLoginData, unlogged} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})

export default class Unlogged extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(unlogged(this.props.login));
    }

    render() {
        if (!this.props.login.id) {
            return <Redirect to="/"/>
        }
        return (
            <h2 className="unlogged"><Loader/>Пожалуйста, подождите, осуществляется выход с сайта...</h2>
        )
    }
}