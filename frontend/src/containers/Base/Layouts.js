import React, { Component } from "react";
import TopMenu from "./Navbar";
import { connect } from "react-redux";

class Layout extends Component {
  render() {
    let { id, parking_name } = this.props.parking;

    return (
      <div className="layout_content">
        <TopMenu parking_id={parseInt(id)} parking_name={parking_name} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  parking: store.current_parking,
});

export default connect(mapStateToProps)(Layout);
