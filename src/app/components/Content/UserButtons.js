import React from 'react';

export default class UserButtons extends React.Component {
    render() {
        return (
            <div>
                <button disabled={this.props.content === 'posts'}
                        onClick={() => {this.props.triggerContent(this.props.state_posts)}}
                        className="button_custom button_show_user_content">
                    Записи
                </button>
                <button disabled={this.props.content === 'subscriptions'}
                        onClick={() => {this.props.triggerContent(this.props.state_subs)}}
                        className="button_custom button_show_user_content">
                    Подписки
                </button>
                <button disabled={this.props.content === 'followers'}
                        onClick={() => {this.props.triggerContent(this.props.state_followers)}}
                        className="button_custom button_show_user_content">
                    Подписчики
                </button>
            </div>
        )
    }
}