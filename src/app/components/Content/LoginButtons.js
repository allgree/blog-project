import React from 'react';

export default class LoginButtons extends React.Component {
    render() {
        return (
            <div className="buttons">
                <button disabled={this.props.content === 'feed'}
                        onClick={() => {this.props.trigger(this.props.state_param, this.props.state_feed)}}
                        className="button_custom button_show_content">
                    Лента
                </button>
                <button disabled={this.props.content === 'posts'}
                        onClick={() => {this.props.trigger(this.props.state_param, this.props.state_posts)}}
                        className="button_custom button_show_content">
                    Мои записи
                </button>
                <button disabled={this.props.content === 'subs'}
                        onClick={() => {this.props.trigger(this.props.state_param, this.props.state_subs)}}
                        className="button_custom button_show_content">
                    Подписки
                </button>
                <button disabled={this.props.content === 'followers'}
                        onClick={() => {this.props.trigger(this.props.state_param, this.props.state_followers)}}
                        className="button_custom button_show_content">
                    Подписчики
                </button>
            </div>
        )
    }
}