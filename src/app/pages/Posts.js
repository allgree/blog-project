import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Loader from '../components/Content/Loader';
import PostItem from '../components/Content/PostItem';

import {connect} from 'react-redux';

import {fetchPostsList, fetchPostsSample, deletePost} from "../actions/postsListActions";
import {fetchUsers} from "../actions/usersListActions";
import {addPostLike, deletePostLike, fetchPostLikes} from "../actions/postLikesActions";


@connect((store) => {
    return {
        users: store.usersList.users,
        is_users_fetching: store.usersList.is_fetching,

        posts: store.postsList.posts,
        is_posts_fetching: store.postsList.is_fetching,
        posts_empty: store.postsList.empty,

        post_likes: store.postLikes.likes,
        is_post_likes_fetching: store.postLikes.is_fetching,

        login: store.login.login
    }
})
export default class Posts extends React.Component {
    constructor() {
        super(...arguments);
        //console.log('constructor');
        //if (this.props.posts.length === 0) {
            this.props.dispatch(fetchUsers());
            this.props.dispatch(fetchPostLikes());
            this.props.dispatch(fetchPostsSample(0));
        //}
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    triggerPostLike(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        if (this.props.post_likes.find(item =>
                item.post_id === post_id && item.user_id === this.props.login.id)) {
            this.props.dispatch(deletePostLike(post_id, this.props.login.id));
        } else {
            this.props.dispatch(addPostLike(post_id, this.props.login.id));
        }
    }

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePost(post_id));
    }

    render() {
        //console.log('render');
        let posts = this.props.posts.map((post, index) => {
            let user = this.props.users.find(item => item.id === post.user_id);
            let likes = this.props.post_likes.filter(item => item.post_id === post.id);
            let users = likes.map((like, index) => {
                return this.props.users.find(item => item.id === like.user_id);
            });
            return <PostItem key={index}
                             post={post}
                             user={user}
                             likes={likes}
                             users={users}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });
        return (
            <div className="content_posts">
                <TransitionGroup className="transition_group">
                    {this.props.posts.length !== 0 &&
                    <CSSTransition timeout={1000}
                                   classNames="appearance">
                        <div>
                            {posts}
                        </div>
                    </CSSTransition>
                    }
                </TransitionGroup>
                <span className="point"/>
                {this.props.is_posts_fetching &&
                <Loader/>}
            </div>
        )
    }

    componentDidMount() {
        $(document).off();
        $(document).on('scroll', () => {
            let $point = $('.point');
            if (!$point[0]) {
                return;
            }
            let point = $point.offset().top;// точка где заканчиваются новые записи
            let scroll_top = $(document).scrollTop();//Насколько прокручена страница сверху (без учета высоты окна)
            let height = $(window).height();// Высота окна
            let load_flag = scroll_top + height >= point;// Флаг подгружаем ли данные
            if (load_flag && !this.props.is_posts_fetching && !this.props.posts_empty) {
                //this.props.dispatch(fetchPostsSample(this.props.posts.length));
                this.rqst(this.props.posts.length);
            }
        });
    }

    rqst(offset) {
        //console.log(offset);
        this.props.dispatch(fetchPostsSample(offset));
    }
}