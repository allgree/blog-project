import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './app/store';

import Layout  from './app/layouts/Layout';
import Main from './app/pages/Main';
import Posts from './app/pages/Posts';
import Blogs from './app/pages/Blogs';
import Ratings from './app/pages/Ratings';
import About from './app/pages/About';
import User from './app/pages/User';
import Post from './app/pages/Post';
import Login from './app/pages/Login';
import Unlogged from './app/pages/Unlogged';
import Cabinet from './app/pages/Cabinet';
import Register from './app/pages/Register';
import PageNotFound from './app/pages/PageNotFound';
import RedirectComponent from "./app/pages/RedirectComponent";
import RefreshCabinet from "./app/pages/RefreshCabinet";

const app = document.getElementById('app');

class App extends React.Component {
    render() {
        return (
                <Provider store={store}>
                    <BrowserRouter>
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route path="/posts" component={Posts}/>
                                <Route path="/blogs" component={Blogs}/>
                                <Route path="/ratings" component={Ratings}/>
                                <Route path="/about" component={About}/>
                                <Route path="/user/:user_id" component={User}/>
                                <Route path="/post/:post_id" component={Post}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/unlogged" component={Unlogged}/>
                                <Route path="/cabinet" component={Cabinet}/>
                                <Route path="/register" component={Register}/>
                                <Route path="/redirect_component" component={RedirectComponent}/>
                                <Route path="/refresh_cabinet" component={RefreshCabinet}/>
                                <Route path="*" component={PageNotFound}/>
                            </Switch>
                        </Layout>
                    </BrowserRouter>
                </Provider>
        )
    }
}
ReactDOM.render(
   <App/>
    ,
    app
);



