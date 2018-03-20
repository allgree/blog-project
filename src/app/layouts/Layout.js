import React from 'react';

import Nav from '../components/Header/Nav';


export default class Layout extends React.Component {
    render () {
        return (
            <main>
                <div className="main_background"/>
                <Nav/>
                <div className="content">
                    {this.props.children}
                    <div className="empty_down"/>

                </div>
                <footer>
                    &copy; 2018 Personal blog. Developed by Alexey Gritsenko
                </footer>
            </main>
        );
    }
}