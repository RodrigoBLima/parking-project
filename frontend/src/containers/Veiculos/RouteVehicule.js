import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Form from './Form';
import List from './List';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/:parking_id/vehicules/edit/:vehicule_id" component={Form} />
                <Route path="/:parking_id/vehicules/add/" component={Form} />
                <Route path="/:parking_id/vehicules/" component={List} /> 
            </Switch>
        )
    }
}

export default withRouter(Routes)