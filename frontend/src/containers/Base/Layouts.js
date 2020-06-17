import React, { Component } from "react";
// import Sidebar from './Sidebar'
import TopMenu from "./Navbar";
// import AddButton from '../../components/Add_button'
import { connect } from 'react-redux'


class Layout extends Component {
  componentDidMount(){
    console.log("CARREGOU O LAYOUT")
    console.log(this.props.parking)
  }
  render() {
    let {id,parking_name} = this.props.parking

    return (
      // let 
      <div className="layout_content">
        {/* <Sidebar /> */}
        <TopMenu  parking_id={parseInt(id)} parking_name={parking_name}/>
        {/* <div className="container"> */}
            {this.props.children}
        {/* </div> */}
        {/* <AddButton url="/rodrigo" /> */}
      </div>
    );
  }
}
const mapStateToProps = store => ({
  parking: store.current_parking
})

export default  connect(mapStateToProps)(Layout)
