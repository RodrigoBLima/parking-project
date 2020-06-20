import React,{Component} from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class Spinner extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true
//     };
//   }
 
  render() {
    return (
      <div className="sweet-loading">
        <HashLoader
          css={override}
          size={150}
          color={"#0747a6"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
export default Spinner