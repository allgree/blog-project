import React from 'react';

import LoginForm from '../components/Content/LoginForm';

export default class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.login = this.login.bind(this);
    }

    login(values) {
        console.log(values);
    }

    render() {
        return (
            <div className="content__login">
                <LoginForm onSubmit={this.login}/>
            </div>
        )
    }
}