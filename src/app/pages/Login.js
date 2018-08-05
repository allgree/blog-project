import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../components/Content/forms/LoginForm';

import {connect} from 'react-redux';

import {fetchLogin, fetchLoginData} from "../actions/loginActions";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})
export default class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.login = this.login.bind(this);
        this.state = {
            valid_profile: true
        }
    }

    login(values) {
        //let caution = document.querySelector('.login_incorrect');
        //caution.style.display = 'none';
        this.setState({valid_profile: true});
        let authorize = fetchLogin(values);
        authorize.payload.then(result => {
            if (!result.data.id) {
                this.setState({
                    valid_profile: false
                })
                //caution.style.display = 'inline';
            } else {
                this.props.dispatch(authorize);
            }
        });
    }

    render() {
        if (this.props.login.id) {
            return <Redirect to="/cabinet"/>
        }

        return (
            <div className="content__login">
                <LoginForm onSubmit={this.login}
                           valid_profile={this.state.valid_profile}/>
            </div>
            )
    }

}