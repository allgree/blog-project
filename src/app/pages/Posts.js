import React from 'react';

import Loader from '../components/Content/Loader';
import PostItem from '../components/Content/PostItem';
import SearchFrom from '../components/Content/forms/SearchForm';

import {connect} from 'react-redux';

import {fetchPostsSample} from "../actions/postsListActions";
import {deletePost} from "../actions/deletePost";
import {fetchLoginData} from "../actions/loginActions";
import {addPostLike, deletePostLike} from "../actions/postLikesActions";

import {autoloadWithSearch} from '../componentsFunctions/autoloadWithSearch';
import {like} from '../componentsFunctions/like';
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";
import {searchPosts} from "../componentsFunctions/searchPosts";


@connect((store) => {
    return {
        posts: store.postsList.posts,
        is_posts_fetching: store.postsList.is_fetching,
        posts_empty: store.postsList.empty,

        login: store.login.login,
    }
})
export default class Posts extends React.Component {
    constructor() {
        super(...arguments);

        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchPostsSample(0, ''));
        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            search_value: ''
        }
    }

    // добавить/удалить лайк
    triggerPostLike(post_id) {
        like(this.props.posts,
            post_id,
            this.props.dispatch,
            addPostLike,
            deletePostLike,
            this.props.login.id);
    }

    // удалить пост
    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deletePost(post_id));
    }

    // обработка строки поиска
    search(form_value) {
        searchPosts(form_value, this, fetchPostsSample);
    }

    render() {
        let posts = this.props.posts.map((post, index) => {
            return <PostItem post={post}
                             key={index}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });

        return (
            <div className="content_posts">
                <SearchFrom search={this.search}
                            placeholder={'Введите заголовок записи'}/>
                        {this.props.posts.length !== 0 &&
                            <div>{posts}</div>}
                    <span className="point"/>
                    {this.props.is_posts_fetching &&
                    <Loader/>}
                <div className="link_to_up" onClick={() => {scrollTop()}}/>
            </div>
        )
    }

    componentDidMount() {
        scrollTop();
        $(document).off();
        $(document).on('scroll', () => {
            linkUp();
            autoloadWithSearch(this.props.is_posts_fetching,
                     this.props.posts_empty,
                     this.props.dispatch,
                     fetchPostsSample,
                     this.props.posts.length,
                     this.state.search_value)
        });
    }

}