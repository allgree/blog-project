import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form'

import {topLikesPostsReducer} from './reducers/topLikesPostsReducer';
import {topViewsPostsReducer} from "./reducers/topViewsPostsReducer";
import {userReducer} from './reducers/userReducer';
import {usersListReducer} from "./reducers/usersListReducer";
import {blogerReducer} from "./reducers/blogerReducer";
import {commentatorReducer} from "./reducers/commentatorReducer";

import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise());

const reducers = combineReducers({
    topLikesPosts: topLikesPostsReducer,
    topViewsPosts: topViewsPostsReducer,
    user: userReducer,
    usersList: usersListReducer,
    bloger: blogerReducer,
    commentator: commentatorReducer,
    form: formReducer
});

const store = createStore(reducers, middleware);


export default store;