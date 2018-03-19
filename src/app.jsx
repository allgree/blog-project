import React from 'react';
import ReactDOM from 'react-dom';
import {AnimatedSwitch} from 'react-router-transition';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import store from './app/store';

import Layout  from './app/layouts/Layout';
import Main from './app/pages/Main';
import Posts from './app/pages/Posts';
import Blogs from './app/pages/Blogs';
import About from './app/pages/About';
import User from './app/pages/User';
import Post from './app/pages/Post';
import PageNotFound from './app/pages/PageNotFound';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/posts" component={Posts}/>
                    <Route path="/blogs" component={Blogs}/>
                    <Route path="/about" component={About}/>
                    <Route path="/user/:user_id" component={User}/>
                    <Route path="/post/:post_id" component={Post}/>
                    <Route path="*" component={PageNotFound}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    </Provider>
    ,
    app
);


//ReactDOM.render(
//    <Provider store={store}>
//        <BrowserRouter>
//            <Layout>
//                <AnimatedSwitch atEnter={{ opacity: 0 }}
//                                atLeave={{ opacity: 0 }}
//                                atActive={{ opacity: 1 }}
//                                className="switch-wrapper">
//                    <Route exact path="/" component={Main}/>
//                    <Route path="/posts" component={Posts}/>
//                    <Route path="/blogs" component={Blogs}/>
//                    <Route path="/about" component={About}/>
//                    <Route path="/user/:user_id" component={User}/>
//                    <Route path="/post/:post_id" component={Post}/>
//                    <Route path="*" component={PageNotFound}/>
//                </AnimatedSwitch>
//            </Layout>
//        </BrowserRouter>
//    </Provider>
//    ,
//    app
//);

//ReactDOM.render(
//    <Provider store={store}>
//        <Router history={browserHistory}>
//
//                <Route path="/"
//                       component={Layout}>
//                    <AnimatedSwitch atEnter={{ opacity: 0 }}
//                                    atLeave={{ opacity: 0 }}
//                                    atActive={{ opacity: 1 }}
//                                    className="switch-wrapper">
//                    <IndexRoute component={Main}/>
//                    <Route path="posts" component={Posts}/>
//                    <Route path="blogs" component={Blogs}/>
//                    <Route path="about" component={About}/>
//                    <Route path="user/:user_id" component={User}/>
//                    <Route path="post/:post_id" component={Post}/>
//                    <Route path="*" component={PageNotFound}/>
//                    </AnimatedSwitch>
//                </Route>
//        </Router>
//    </Provider>
//    ,
//    app
//);

