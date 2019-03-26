import React from 'react';
import Header from './components/header';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import ComponentPage from './pages/component';
import TestPage from './pages/test';

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/components/:page" component={ComponentPage}/>
                    {process.env.NODE_ENV === 'development' && <Route path="/test" component={TestPage}/>}
                    <Redirect from="/" to="/home"/>
                </Switch>
            </Router>
        );
    }
}

export default App;
