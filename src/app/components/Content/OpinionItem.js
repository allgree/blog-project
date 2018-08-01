import React from 'react';
import {Link} from 'react-router-dom';

export default class OpinionItem extends React.Component {
    render() {
        let timestamp = Date.parse(this.props.opinion.createdAt);
        let date = new Date();
        date.setTime(timestamp);
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let created_date = `${day}.${month}.${date.getFullYear()}`;
        let created_time = `${date.getHours()}:${date.getMinutes()}`;

        return (
            <div className="content_opinion_item block_item">
                <p className="content_opinion_item_body">
                    {this.props.opinion.body}
                </p>
                {this.props.opinion.author &&
                <p className="content_opinion_item_author">
                    Пользователь: <Link to={`/user/${this.props.opinion.author.id}`} className="content_opinion_item_author_link">
                        {this.props.opinion.author.name} {this.props.opinion.author.surname}
                    </Link>
                </p>}
                {this.props.opinion.name &&
                <p className="content_opinion_item_author">
                    Гость: {this.props.opinion.name}
                </p>}
                <div className="content__opinion_item__info">
                    <span className="content__opinion_item__info_span">
                        <i className="fa fa-calendar" aria-hidden="true"/>&nbsp;<span>{created_date}</span>
                    </span>
                    <span className="content__opinion_item__info_span">
                        <i className="fa fa-clock-o" aria-hidden="true"/>&nbsp;<span>{created_time}</span>
                    </span>
                </div>
            </div>
        )
    }
}