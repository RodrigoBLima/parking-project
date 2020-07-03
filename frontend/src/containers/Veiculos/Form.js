import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SelectBox from "../../components/SelectBox";
import myConfig from "../../configs/config";
// import { getFormatedDate } from "../../helpers/utils";

// SelectBox
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      board: "",
      model: "",
      brand: "",
      year: "",
      color: "",
      h_enter: "",
      h_exit: "",
      parking_id: this.props.match.params.parking_id,
      vehicule_id: this.props.match.params.vehicule_id,
      title: "Adicionar veículo",
      employees: [],
      employe_id: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEmployees() {
    const URL_EMPLOYEES = `${
      myConfig.API_URL
    }/employees/?id=&idEstacionamento=${parseInt(this.state.parking_id)}`;

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

  getVehicule() {
    let { vehicule_id, parking_id } = this.state;

    let url = `${myConfig.API_URL}/cars/?id=${parseInt(
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
        owner: data.owner,
        board: data.board,
        model: data.model,
        brand: data.brand,
        year: data.year,
        color: data.color,
        h_enter: data.h_enter,
        h_exit: data.h_exit,
        employe_id: data.idFuncionario
      });
    });
  }

  createVehicule(){
    let { parking_id } = this.state;

    let CREATE_VEHICULE = `${
      myConfig.API_URL
    }/cars/?id=&idEstacionamento=${parseInt(parking_id)}`;
    axios({
      baseURL: CREATE_VEHICULE,
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

  editVehicule(){
    let { vehicule_id, parking_id } = this.state;

    let UPDATE_VEHICULE = `${myConfig.API_URL}/cars/${parseInt(
      vehicule_id
    )}/`;

    axios({
      baseURL: UPDATE_VEHICULE,
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

  }
  
  componentDidMount() {
    let { vehicule_id } = this.state;

    if (vehicule_id !== undefined) {
      this.getVehicule();
    }
    //LOADING EMPLOYEES
    this.getEmployees();
  }

  handleChangeText(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleInitDateChange(e) {
    console.log("init", e);
    // console.log(getFormatedDate(e))
    // let data = new Date(e),
    // // console.log(data)
    // // console.log(typeof(data))
    // // console.log()
    // dia = data.getDate().toString(),
    // diaF = (dia.length == 1) ? '0' + dia : dia,
    // mes = (data.getMonth() + 1).toString(),
    // mesF = (mes.length == 1) ? '0' + mes : mes,
    // anoF = data.getFullYear(),
    // hour = ("0" + data.getHours()).slice(-2).toString(),
    // minutes = ("0" + data.getMinutes()).slice(-2).toString(),
    // seconds = ("0" + data.getSeconds()).slice(-2).toString();

    // console.log( anoF + "-" + mesF + "-" + diaF + "T" + hour + ":" + minutes + ":" + seconds) // 2020-02-05T12:54:00
    // console.log(getFormatedDate(e))
    this.setState({
      h_enter: e,
    });
  }

  handleEndDateChange(e) {
    console.log("end", e);
    // console.log(getFormatedDate(e))
    this.setState({
      h_exit: e,
    });
  }

  getFormData() {
    const form_data = new FormData();

    form_data.append("owner", this.state.owner);
    form_data.append("board", this.state.board);
    form_data.append("model", this.state.model);
    form_data.append("brand", this.state.brand);
    form_data.append("year", this.state.year);
    form_data.append("color", this.state.color);
    form_data.append("h_enter", this.state.h_enter);
    form_data.append("h_exit", this.state.h_exit);
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
      this.editVehicule()
     
    } else {
      //post
      this.createVehicule()
      
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
            value={"name"}
            change={(e) => this.handleSelectEmployee(e)}
            label="Funcionários"
            id="select_countries"
          />
        </div>
      );
    } else {
      employees = (
        <div className="form-group">
          <label htmlFor="">Funcionários</label>
          <select className="form-control">
            <option value="">-------------</option>
          </select>
        </div>
      );
    }

    return (
      <div className="content">
        <section>
          <h1 style={{ color: "#007bff" }}>{this.state.title}</h1>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="007bff" />
            Voltar
          </Link>
        </section>

        <form onSubmit={this.handleSubmit} style={{marginLeft:"40px",marginTop:"150px"}}>
          <div className="form-group">
            <label htmlFor="">Nome do proprietário</label>

            <input
              value={this.state.owner}
              name="owner"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Nome proprietário"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Placa do veículo</label>

            <input
              value={this.state.board}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Placa"
              // type="email"
              name="board"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Coloração</label>

            <input
              value={this.state.color}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Cor"
              // type="text"
              name="color"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Marca do veículo</label>

            <input
              value={this.state.brand}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Marca"
              name="brand"
            />
          </div>
          {/* <div className="input-group"> */}
          <div className="form-group">
            <label htmlFor="">Ano de fabricação</label>

            <input
              value={this.state.year}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Ano"
              name="year"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Modelo do veículo</label>

            <input
              value={this.state.model}
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Modelo"
              name="model"
            />
          </div>
          {/* <div className="input-group"> */}
          {/* <input
                value={this.state.h_enter}
                type="datetime"
               onChange={(e) => this.handleInitDateChange(e.target.value)}
                placeholder="Hora entrada"
                name="h_enter"
              /> */}
          <div className="form-group">
            <label htmlFor="">Hora de entrada</label>

            <input
              type="datetime-local"
              onChange={(e) => this.handleInitDateChange(e.target.value)}
              name="h_enter"
              value={this.state.h_enter}
              placeholder="Hora entrada"
            />
          </div>
          {/* <div className="input-group"> */}
          {/* <input
                value={this.state.h_exit}
                type="date"
                onChange={(e) => this.handleEndDateChange(e.target.value)}
                placeholder="Hora saida"
                name="h_exit"
              /> */}
          <div className="form-group">
            <label htmlFor="">Hora de saída</label>
            <input
              type="datetime-local"
              onChange={(e) => this.handleEndDateChange(e.target.value)}
              placeholder="Hora saida"
              name="h_exit"
              // placeholder="Hora saida"
              value={this.state.h_exit}
            />
            {/* </div> */}
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
