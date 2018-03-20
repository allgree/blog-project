import React from 'react';
//import {Link} from 'react-router';
import {Link} from 'react-router-dom';


export default class TooltipLikes extends React.Component {
    render() {
        return (
            <div className="tooltip_content">
                     {this.props.users.map((user, index) => {
                         return (
                             <p className='tooltip_user' key={index}>
                                 <Link to={`/user/${user.id}`} className="tooltip_user_link">
                                     <img src={`${user.avatar_path}`} className="ava_tooltip"/> {`${user.name} ${user.surname}`}
                                 </Link>
                             </p>
                         )
                     })}
            </div>
        )
    }
}