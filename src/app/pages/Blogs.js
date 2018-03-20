import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Loader from '../components/Content/Loader';
import UserItem from '../components/Content/UserItem';

import {connect} from 'react-redux';

import {fetchUsers} from "../actions/usersListActions";

@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching
    }
})
export default class Blogs extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchUsers());
    }
    render() {
        let users = this.props.users.map((user, index) => {
           return <UserItem key={index}
                            user={user}/>
        });
        return (
            <div className="content_blogs">
                <TransitionGroup className="transition_group">
                    {this.props.is_users_fetching
                    ? <Loader/>
                    :  <CSSTransition timeout={1000}
                                      classNames="appearance">
                            <div>
                                {users}
                            </div>
                        </CSSTransition>
                    }
                </TransitionGroup>
            </div>
        )
    }
}