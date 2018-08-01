import React from 'react';
import {Link} from 'react-router-dom';

import {formatTimestamp} from "../../componentsFunctions/formatTimestamp";

export default class OpinionItem extends React.Component {
    render() {

        let {created_date, created_time} = formatTimestamp(this.props.opinion.createdAt);

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