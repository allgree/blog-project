import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form'

import {topLikesPostsReducer} from './reducers/topLikesPostsReducer';
import {topViewsPostsReducer} from "./reducers/topViewsPostsReducer";
import {userReducer} from './reducers/userReducer';
import {postReducer} from "./reducers/postReducer";
import {postCommentsReducer} from "./reducers/postCommentsReducer";
import {usersListReducer} from "./reducers/usersListReducer";
import {blogerReducer} from "./reducers/blogerReducer";
import {commentatorReducer} from "./reducers/commentatorReducer";
import {userPostsReducer} from './reducers/userPostsReducer';
import {postsListReducer} from "./reducers/postsListReducer";

import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise());

const reducers = combineReducers({
    topLikesPosts: topLikesPostsReducer,
    topViewsPosts: topViewsPostsReducer,
    user: userReducer,
    post: postReducer,
    postsList: postsListReducer,
    postComments: postCommentsReducer,
    usersList: usersListReducer,
    bloger: blogerReducer,
    commentator: commentatorReducer,
    userPosts: userPostsReducer,
    form: formReducer
});

const store = createStore(reducers, middleware);


export default store;