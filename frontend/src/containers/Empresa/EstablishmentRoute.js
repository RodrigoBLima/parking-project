import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Form from './Form';
// import List from './List';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/:parking_id/edit/" component={Form} />
                {/* <Route path="/:parking_id/employees/add/" component={Form} /> */}
                {/* <Route path="/:parking_id/employees/" component={List} /> */}
            </Switch>
        )
    }
}

export default withRouter(Routes)