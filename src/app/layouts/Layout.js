import React from 'react';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';


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
                <Footer/>
            </main>
        );
    }
}