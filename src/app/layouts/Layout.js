import React from 'react';

import Nav from '../components/Header/Nav';


export default class Layout extends React.Component {
    render () {
        return (
            <main>
                <Nav/>
                <div className="empty_up"/>
                    {this.props.children}
                <footer>
                    &copy; Алексей Гриценко 2018
                </footer>
            </main>
        );
    }
}