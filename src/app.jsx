import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './app/store';

import Layout  from './app/layouts/Layout';
import Main from './app/pages/Main';
import Posts from './app/pages/Posts';
import Blogs from './app/pages/Blogs';
import About from './app/pages/About';
import PageNotFound from './app/pages/PageNotFound';

const app = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/"
                   component={Layout}>
                <IndexRoute component={Main}/>
                <Route path="posts" component={Posts}/>
                <Route path="blogs" component={Blogs}/>
                <Route path="about" component={About}/>
                <Route path="*" component={PageNotFound}/>
            </Route>
        </Router>
    </Provider>
    ,
    app
);

