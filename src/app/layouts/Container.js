import React from 'react';

export default class Container extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="content">
                    {this.props.children}
                    <div className="empty_down"/>
                </div>
                <footer>
                    &copy; 2018 Personal blog. Developed by Alexey Gritsenko
                </footer>
            </div>
        )
    }
}