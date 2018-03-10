import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout  from './app/layouts/Layout';
import Main from './app/pages/Main';
import Blogs from './app/pages/Blogs';
import PageNotFound from './app/pages/PageNotFound';

const app = document.getElementById('app');


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/"
               component={Layout}>
            <IndexRoute component={Main}/>
            <Route path="blogs" component={Blogs}/>
            <Route path="*" component={PageNotFound}/>
        </Route>
    </Router>,
    app
);

