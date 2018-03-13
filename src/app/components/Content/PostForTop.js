import React from 'react';


export default class PostForTop extends React.Component {
    render() {
        return (
            <div className="content__post_top">
                <h3>{this.props.post.title}</h3>
                <div>{this.props.post.body}</div>
                <p>{this.props.post.likes}</p>
                <p>Автор: {this.props.user.name} {this.props.user.surname}</p>
            </div>
        )
    }

}