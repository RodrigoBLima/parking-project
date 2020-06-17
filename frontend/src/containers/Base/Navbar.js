import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

export default class TopMenu extends Component {
  
  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <div className="header">
        <div className="navbar">
          <div className="logo">
            Bem Vindo,{" "}
            <Link to="/" className="link">
              {this.props.parking_name}
            </Link>
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to={`/${this.props.parking_id}/employees/`}>
                  Funcionários
                </Link>
              </li>
              <li>
                <a onClick={this.handleLogout}>Sair</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
