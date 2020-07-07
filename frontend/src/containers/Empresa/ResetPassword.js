import React, { Component } from "react";
import ReactPasswordStrength from "react-password-strength";
import myConfig from "../../configs/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parking_id: this.props.match.params.parking_id,
      old_password: "",
      new_password: "",
      confirm_new: "",
      is_valid: "false",
      is_invalid: "false",
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  getCurrentUser() {
    let USER_URL = `${myConfig.API_URL}/accounts/me/`;

    axios({
      baseURL: USER_URL,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("client-token")}`,
      },
    }).then((res) => {
      // console.log(res.data)
      this.setState({
        parking_id: res.data.id,
      });
    });
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    this.getCurrentUser();
  }

  handleChangeText(e, name) {
    let state = {};
    state[name] = e.password;
    this.setState(state);
  }

  getFormatData() {
    let form_data = new FormData();
    form_data.append("new_password", this.state.new_password);
    form_data.append("old_password", this.state.old_password);

    return form_data;
  }

  handleSave(e) {
    e.preventDefault();
    const PASSWORD_URL =
      myConfig.API_URL +
      "/parkings/" +
      this.state.parking_id +
      "/set_password/";

    if (this.state.new_password !== this.state.confirm_new) {
      this.setState({
        is_invalid: true,
      });
    }
    if (
      this.state.new_password === "" ||
      this.state.confirm_new === "" ||
      this.state.old_password === ""
    ) {
      this.setState({
        is_invalid: true,
      });
      setTimeout(() => {
        this.setState({
          is_invalid: false,
        });
      }, 6000);
    }

    axios({
      baseURL: PASSWORD_URL,
      method: "put",
      data: this.getFormatData(),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("client-token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        this.setState({ is_valid: true });
        setTimeout(() => {
          this.setState({
            is_valid: false,
          });
        }, 7000);
        window.location.href = "/";
      } else {
        // console.log(response.data);
        this.setState({ is_invalid: true });
      }
      setTimeout(() => {
        this.setState({
          is_invalid: false,
        });
      }, 8000);
    });
  }

  render() {
    if (this.state.is_invalid === true) {
      toast(
        "Todos os campos devem estar preenchidos e Nova senha e Confirmar senha devem ser exatamente iguais."
      );
    } else if (this.state.is_valid === true) {
      toast("Nova senha cadastrada com sucesso!");
    }

    return (
      <div className="reset_pass_content">
        <h1 align="center">Editar senha</h1>

        <form
          method="POST"
          onSubmit={this.handleSave}
          encType="multipart/form-data"
        >
          <label htmlFor="old_password">Senha antiga</label>
          <ReactPasswordStrength
            minLength={4}
            minScore={2}
            scoreWords={["Fraca", "Razoável", "Bom", "Forte", "Muito forte"]}
            changeCallback={(event) =>
              this.handleChangeText(event, "old_password")
            }
            name="old_password"
            inputProps={{
              name: "old_password",
              autoComplete: "off",
              className: "form-control pass-strength",
              placeholder: "Senha antiga",
            }}
          />
          <label htmlFor="new_password">Nova senha</label>
          <ReactPasswordStrength
            minLength={4}
            minScore={2}
            scoreWords={["Fraca", "Razoável", "Bom", "Forte", "Muito forte"]}
            changeCallback={(event) =>
              this.handleChangeText(event, "new_password")
            }
            inputProps={{
              name: "new_password",
              autoComplete: "off",
              className: "form-control pass-strength",
              placeholder: "Digite aqui sua nova senha",
            }}
          />
          <label htmlFor="confirm_new">Confirmar senha</label>
          <ReactPasswordStrength
            minLength={4}
            minScore={2}
            scoreWords={["Fraca", "Razoável", "Bom", "Forte", "Muito forte"]}
            changeCallback={(event) =>
              this.handleChangeText(event, "confirm_new")
            }
            inputProps={{
              name: "confirm_new",
              autoComplete: "off",
              className: "form-control pass-strength",
              placeholder: "Confirme aqui sua nova senha",
            }}
          />{" "}
          <br />
          <div align="center">
            <input type="submit" className="button" value="Salvar" />
            <Link to="/signup" className="back-link">
              <FiLogIn size={16} color="007bff" />
              Voltar
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
export default ResetPassword;
