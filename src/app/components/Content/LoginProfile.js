import React from 'react';

import AvatarForm from "./forms/AvatarForm";
import LoginInfo from "./LoginInfo";
import EditUserForm from "./forms/EditUserForm";
import EditPassForm from "./forms/EditPassForm";

export default class LoginProfile extends React.Component {
    render() {
        return (
            <div className="content__cabinet__login">
                <div className="content__cabinet__login_ava">
                    <img src={this.props.login.avatar_path} className="big_avatar"/>
                    {this.props.state.avatar === 'button' &&
                    <div className="change_avatar__div">
                        <button onClick={() => {this.props.trigger('avatar', 'form')}}
                                className="button_custom button_edit_avatar">
                            Сменить аватар
                        </button>
                    </div>
                    }
                    {this.props.state.avatar === 'form' &&
                    <AvatarForm changeAvatar={this.props.changeAvatar}
                                trigger={this.props.trigger}
                                state_param="avatar"
                                state_value="button"
                                extensions={this.props.extensions}/>
                    }
                </div>

                {this.props.state.info === 'info' &&
                <LoginInfo login={this.props.login}
                           trigger={this.props.trigger}
                           state_param="info"
                           state_value_form="form"
                           state_value_pass="pass"/>}
                {this.props.state.info === 'form' &&
                <EditUserForm onSubmit={this.props.editUser}
                              login={this.props.login}
                              trigger={this.props.trigger}
                              state_param="info"
                              state_value="info"/>}
                {this.props.state.info === 'pass' &&
                <EditPassForm onSubmit={this.props.editPass}
                              login={this.props.login}
                              trigger={this.props.trigger}
                              state_param="info"
                              state_value="info"
                              valid_old_pass={this.props.state.valid_old_pass}
                              valid_new_pass={this.props.state.valid_new_pass}/>}
            </div>
        )
    }
}