import React from 'react';
import {Redirect} from 'react-router-dom';

export default class ChangeMatchParam extends React.Component {
    render() {
        return (
            <Redirect to={`/user/${this.props.match.params.id}`}/>
        )
    }
}