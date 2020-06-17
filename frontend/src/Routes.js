import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import EmployeeRoute from './containers/Funcionarios/EmployeeRoute'
import VehiculesRoute from './containers/Veiculos/RouteVehicule'
import EstablishmentRoute from './containers/Empresa/EstablishmentRoute';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                     <Route path="/:parking_id/employees/*" component={EmployeeRoute} />
                     <Route path="/:parking_id/vehicules/*" component={VehiculesRoute} />
                     <Route path="/:parking_id/*" component={EstablishmentRoute} />

                </Switch>                
            </div>
        )
    }
}
