import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form'

import {userReducer} from './reducers/userReducer';
import {postReducer} from "./reducers/postReducer";
import {postCommentsReducer} from "./reducers/postCommentsReducer";
import {usersListReducer} from "./reducers/usersListReducer";
import {blogerReducer} from "./reducers/blogerReducer";
import {commentatorReducer} from "./reducers/commentatorReducer";
import {userPostsReducer} from './reducers/userPostsReducer';
import {postsListReducer} from "./reducers/postsListReducer";
import {loginReducer} from "./reducers/loginReducer";
import {postLikesReducer} from "./reducers/postLikesReducer";
import {commentLikesReducer} from "./reducers/commentLikesReducer";
import {subsReducer} from "./reducers/subsReducer";
import {subscribesReducer} from "./reducers/subscribesReducer";

import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise());

const reducers = combineReducers({
    user: userReducer,
    post: postReducer,
    postsList: postsListReducer,
    postComments: postCommentsReducer,
    usersList: usersListReducer,
    bloger: blogerReducer,
    commentator: commentatorReducer,
    userPosts: userPostsReducer,
    login: loginReducer,
    postLikes: postLikesReducer,
    commentLikes: commentLikesReducer,
    subs: subsReducer,
    subscribes: subscribesReducer,
    form: formReducer
});

const store = createStore(reducers, middleware);


export default store;