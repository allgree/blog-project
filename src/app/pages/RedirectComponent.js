import React from 'react';
import {Redirect} from 'react-router-dom';

export default class RedirectComponent extends React.Component {
    render() {
        let route = this.props.location.pathname.replace('/redirect_component', '');
        return (
            <Redirect to={route}/>
        )
    }
}

