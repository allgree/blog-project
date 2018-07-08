import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form'


import {usersListReducer} from "./reducers/usersListReducer";
import {postsListReducer} from "./reducers/postsListReducer";
import {topViewsPostsReducer} from "./reducers/topViewsPostsReducer";
import {topLikesPostsReducer} from "./reducers/topLikesPostsReducer";
import {blogerReducer} from "./reducers/blogerReducer";
import {commentatorReducer} from "./reducers/commentatorReducer";
import {userReducer} from './reducers/userReducer';
import {userPostsReducer} from './reducers/userPostsReducer';
import {subsReducer} from "./reducers/subsReducer";
import {subscribesReducer} from "./reducers/subscribesReducer";



import {postReducer} from "./reducers/postReducer";
import {postCommentsReducer} from "./reducers/postCommentsReducer";
import {loginReducer} from "./reducers/loginReducer";
import {postLikesReducer} from "./reducers/postLikesReducer";
import {commentLikesReducer} from "./reducers/commentLikesReducer";


import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise());

const reducers = combineReducers({
    usersList: usersListReducer,
    postsList: postsListReducer,
    topViewsPosts: topViewsPostsReducer,
    topLikesPosts: topLikesPostsReducer,
    bloger: blogerReducer,
    commentator: commentatorReducer,
    user: userReducer,
    userPosts: userPostsReducer,
    subs: subsReducer,
    subscribes: subscribesReducer,




    post: postReducer,
    postComments: postCommentsReducer,
    login: loginReducer,
    postLikes: postLikesReducer,
    commentLikes: commentLikesReducer,

    form: formReducer
});

const store = createStore(reducers, middleware);


export default store;