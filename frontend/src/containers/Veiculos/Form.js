import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SelectBox from "../../components/SelectBox";
// SelectBox
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proprietario: "",
      placa: "",
      modelo: "",
      marca: "",
      ano: "",
      cor: "",
      h_entrada: "",
      h_saida: "",
      parking_id: this.props.match.params.parking_id,
      vehicule_id: this.props.match.params.vehicule_id,
      title: "Adicionar veículo",
      employees: [],
      employe_id: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { vehicule_id, parking_id } = this.state;
    if (vehicule_id !== undefined) {
      let url = `http://127.0.0.1:8000/api/v1/cars/?id=${parseInt(
        vehicule_id
      )}&idEstacionamento=${parseInt(parking_id)}`;
      axios({
        baseURL: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
      }).then((res) => {
        console.log("***********");
        console.log(res.data[0]);
        console.log("***********");
        let data = res.data[0];
        this.setState({
          title: "Atualizar veículo",
          proprietario: data.proprietario,
          placa: data.placa,
          modelo: data.modelo,
          marca: data.marca,
          ano: data.ano,
          cor: data.cor,
          h_entrada: data.h_entrada,
          h_saida: data.saida,
        });
      });
    }
    //LOADING EMPLOYEES
    const URL_EMPLOYEES = `http://127.0.0.1:8000/api/v1/employees/?id=&idEstacionamento=${parseInt(
      this.state.parking_id
    )}`;

    axios({
      baseURL: URL_EMPLOYEES,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
    }).then((res) => {
      console.log("***********");
      console.log(res.data);
      console.log("***********");
      this.setState({ employees: res.data });
    });
  }

  handleChangeText(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleInitDateChange(e) {
    console.log("init", e);
  }
  handleEndDateChange(e) {
    console.log("end", e);
  }
  getFormData() {
    const form_data = new FormData();

    form_data.append("proprietario", this.state.proprietario);
    form_data.append("placa", this.state.placa);
    form_data.append("modelo", this.state.modelo);
    form_data.append("marca", this.state.marca);
    form_data.append("ano", this.state.ano);
    form_data.append("cor", this.state.cor);
    form_data.append("h_entrada", this.state.h_entrada);
    form_data.append("h_saida", this.state.h_saida);
    form_data.append("idEstacionamento", this.state.parking_id);

    form_data.append("idFuncionario", this.state.employe_id);

    // idFuncionario

    return form_data;
  }

  handleSubmit(e) {
    e.preventDefault();
    let { vehicule_id, parking_id } = this.state;
    if (vehicule_id !== undefined) {
      //put
      let url = `http://127.0.0.1:8000/api/v1/cars/?id=${parseInt(
        vehicule_id
      )}&idEstacionamento=${parseInt(parking_id)}`;
      axios({
        baseURL: url,
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
        data: this.getFormData(),
      })
        .then((res) => {
          console.log("-----------");
          console.log(res.data);
          console.log("-----------");
          if (res.status === 200) {
            //   console.log(response.data);
            // this.setState({ submited_update: true });
            toast("Atualizado com sucesso!");
          }
          setTimeout(() => {
            // this.setState({
            //     submited_update: false,
            // });
          }, 3000);
          window.location.href = "/" + this.state.parking_id + "/vehicules/";
        })
        .catch((error) => {
          // window.error = error.response.data;
          // console.log(error.response.data)
          // let error_msg = '';
          // Object.keys(error.response.data).forEach(function(e){
          //     error_msg += e + ': '+ error.response.data[e][0] + ' \n ';
          // });
          // this.setState({ error: error_msg});
          toast("Erro ao atualizar.");
        });
    } else {
      //post
      let url = `http://127.0.0.1:8000/api/v1/cars/?id=&idEstacionamento=${parseInt(parking_id)}`;
      axios({
        baseURL: url,
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
        data: this.getFormData(),
      })
        .then((res) => {
          console.log("-----------");
          console.log(res.data);
          console.log("-----------");
          if (res.status === 201) {
            //   console.log(response.data);
            // this.setState({ submited_update: true });
            toast("Cadastrado com sucesso!");
          }
          setTimeout(() => {
            // this.setState({
            //     submited_update: false,
            // });
          }, 3000);
          window.location.href = "/" + this.state.parking_id + "/vehicules/";
        })
        .catch((error) => {
          // window.error = error.response.data;
          // console.log(error.response.data)
          // let error_msg = '';
          // Object.keys(error.response.data).forEach(function(e){
          //     error_msg += e + ': '+ error.response.data[e][0] + ' \n ';
          // });
          // this.setState({ error: error_msg});
          toast("Erro ao cadastrar.");
        });
    }
  }
  handleSelectEmployee(e) {
    e.preventDefault();
    // console.log(e.target.value);
    this.setState({
      employe_id: e.target.value,
    });
  }

  render() {
    let employees;

    // let select_countries;
    if (this.state.employees.length > 0) {
      employees = (
        <div className="form-group">
          <SelectBox
            strong="true"
            data={this.state.employees}
            selected_value={this.state.employe_id}
            value={"nome"}
            change={(e) => this.handleSelectEmployee(e)}
            // label="Paises"
            id="select_countries"
          />
        </div>
      );
    } else {
      employees = (
        <div className="form-group">
          {/* <label htmlFor="">Países</label> */}
          <select className="form-control">
            <option value="">-------------</option>
          </select>
        </div>
      );
    }

    return (
      <div className="content">
        <section className="">
          <h1 style={{ color: "#007bff" }}>{this.state.title}</h1>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="007bff" />
            Voltar
          </Link>
        </section>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.proprietario}
            name="proprietario"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Nome proprietário"
          />

          <input
            value={this.state.placa}
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Placa"
            // type="email"
            name="placa"
          />
          <input
            value={this.state.cor}
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Cor"
            // type="text"
            name="cor"
          />
          <input
            value={this.state.marca}
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Marca"
            name="marca"
          />

          <div className="input-group">
            <input
              value={this.state.ano}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Ano"
              name="ano"
            />
            <input
              value={this.state.modelo}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Modelo"
              name="modelo"
            />
            <div className="input-group">
              <input
                value={this.state.h_entrada}
                // type="date"
                onChange={this.handleInitDateChange}
                placeholder="Hora entrada"
                name="h_entrada"
              />
            </div>
            <div className="input-group">
              <input
                value={this.state.h_saida}
                // type="date"
                onChange={this.handleEndDateChange}
                placeholder="Hora saida"
                name="h_saida"
              />
            </div>
          </div>
          {employees}

          <button className="button" type="submit">
            Enviar
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
