import React, { Component } from "react";
import Layout from "./containers/Base/Layouts";
import Routes from "./Routes";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./containers/Usuario/Login";
import Signup from "./containers/Usuario/Signup";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "./store/actions/actions";
import { connect } from "react-redux";

class App extends Component {
  state = {
    isAuthenticated: true,
    parking_id: parseInt(localStorage.getItem("parking_id")),
  };

  componentDidMount() {
    // console.log("componentDidMount in App");

    if (localStorage.getItem("parking-token") !== null) {
      let parking_id = localStorage.getItem("parking_id");
    } else {
      this.setState({ isAuthenticated: false });
    }
  }
  render() {
    let routes = (
      <Switch>
        <Layout>
          <Route
            path="/login"
            render={() => (
              <Redirect to={`/${this.state.parking_id}/vehicules/`} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to={`/${this.state.parking_id}/vehicules/`} />
            )}
          />
          <Route path="/:parking_id*" component={Routes} />
        </Layout>
      </Switch>
    );

    if (!this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/login/" component={Login} />
          <Route path="/signup/" component={Signup} />
          <Route path="/*" render={() => <Redirect to="/login/" />} />
        </Switch>
      );
    }

    return <BrowserRouter>{routes}</BrowserRouter>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParking: () => dispatch(actions.fetchParking()),
  };
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
