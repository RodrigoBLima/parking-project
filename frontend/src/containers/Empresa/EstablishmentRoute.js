import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Form from './Form';
import ResetPassword from './ResetPassword';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/:parking_id/edit/" component={Form} />
                <Route path="/:parking_id/reset_password/" component={ResetPassword} />
            </Switch>
        )
    }
}

export default withRouter(Routes)