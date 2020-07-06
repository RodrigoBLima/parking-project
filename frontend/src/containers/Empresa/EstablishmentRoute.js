import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Form from './Form';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/:parking_id/edit/" component={Form} />
            </Switch>
        )
    }
}

export default withRouter(Routes)