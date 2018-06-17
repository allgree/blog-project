import React from 'react';

export default class DeleteWindow extends React.Component {
    render() {
        return (
            <div className="dialog_conteiner">
                <div className="dialog_window">
                    <p className="dialog_question">{this.props.question}</p>
                    <button type="submit"
                            className="button_custom button_custom__save dialog_button"
                            onClick={() => {this.props.method(this.props.id);
                                                 this.props.hide()}}>
                        Да
                    </button>
                    <button onClick={() => {this.props.hide()}}
                            className="button_custom button_custom__cansel dialog_button">
                        Отмена
                    </button>
                </div>
            </div>
        )
    }
}