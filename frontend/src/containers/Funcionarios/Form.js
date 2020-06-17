import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SelectBox from "../../components/SelectBox";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import axios from "axios";
import api from "../../services/api";
import myConfig from '../../configs/config'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// export default api;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    nome: "",
    credential: "",
    telefone: "",
    cpf: "",
    rg: "",
    country: 32,
    country_name: [],
    location: "",
    cargo: "",
    dt_nasc: "",
    dt_ini: "",
    dt_end: "",
    // employee_id:this.props.match.params.employee_id ,
    employee_id:
      this.props.match.params.employee_id === undefined
        ? -1
        : this.props.match.params.employee_id,
    parking_id: this.props.match.params.parking_id,
    title: "Cadastrar funcionário",
  }
  this.handleSave = this.handleSave.bind(this);
}

  componentDidMount() {
    // let COUNTRIES_URL = .api + "/countries";
    // try {
    // const res =
    // console.log("++++++++++++");
    // console.log(this.props.match.params.employee_id);
    // console.log(this.props.match.params.parking_id);
    // console.log("++++++++++++");
    // let {employee_id,parking_id}=this.state.
    if (this.state.employee_id !== -1) {

      let EMPLOYEE_URL = `${myConfig.API_URL}/employees/?id${parseInt(
        this.state.employee_id
      )}=&idEstacionamento=${parseInt(this.state.parking_id)}`;

      axios({
        baseURL: EMPLOYEE_URL,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
      }).then((res) => {
        console.log("***********++++++++");
        console.log(res.data[0]);
        console.log("***********++++++++");
        this.setState({
          title: "Atualizar dados",
          nome: res.data[0].nome,
          credential: res.data[0].credential,
          telefone: res.data[0].telefone,
          cpf: res.data[0].cpf,
          rg: res.data[0].rg,
          country:res.data[0].pais ,
          // country_name: [],
          location: res.data[0].localidade,
          cargo: res.data[0].cargo,
          dt_nasc: res.data[0].nasc,
          dt_ini: res.data[0].dt_ini,
          dt_end: res.data[0].dt_end,
        });
      });
    }

    const PAIS_URL = `${myConfig.API_URL}/countries/`;

    axios({
      baseURL: PAIS_URL,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
    }).then((res) => {
      console.log("***********");
      console.log(res.data);
      console.log("***********");
      this.setState({ country_name: res.data });
    });
    console.log("CARREGOU O FORM");
    // } catch (e) {
    // toast("Erro ao buscar dados dos paises.");
    // }
    // axios.get(api + "/countries")
  }

  handleChangeText(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelectCountry(e) {
    e.preventDefault();
    // console.log(e.target.value);
    this.setState({
      country: e.target.value,
    });
  }

  handleChange = (location) => {
    // console.log("location ", location)
    this.setState({ location });
  };

  handleSelect = (location) => {
    // console.log("handleSelect",location)
    this.setState({ location });

    geocodeByAddress(location)
      .then((results) =>
        // console.log(results),
        getLatLng(results[0])
      )
      .then((latLng) =>
        this.setState({
          geo_coords: latLng,
          changed: true,
        })
      )
      .catch((error) => console.error("Error", error));
  };
  handleInitDateChange(e) {
    console.log("init", e);
  }
  handleEndDateChange(e) {
    console.log("end", e);
  }
  handleEndDateNasc(e) {
    console.log("end", e);
  }
  getFormData() {
    const form_data = new FormData();

    form_data.append("nome", this.state.nome);
    form_data.append("cargo", this.state.cargo);
    form_data.append("country", this.state.country);
    form_data.append("credential", this.state.credential);
    form_data.append("localidade", this.state.location);
    form_data.append("rg", this.state.rg);
    form_data.append("telefone", this.state.telefone);
    form_data.append("cpf", this.state.cpf);
    form_data.append("dt_end", this.state.dt_end);
    form_data.append("dt_ini", this.state.dt_ini);
    form_data.append("dt_nasc", this.state.dt_nasc);
    form_data.append("idEstacionamento", this.state.parking_id);
  
    return form_data;
  }

  handleSave(e) {
    e.preventDefault();
    // console.log(this.state.nome)
    let {employee_id,parking_id}=this.state
    // console.log(this.state.employee_id)
    if (employee_id !== undefined){
      //put
      let UPDATE_EMPLOYEE = `${myConfig.API_URL}/employees/?id${parseInt(
        employee_id
      )}=&idEstacionamento=${parseInt(parking_id)}`;

      axios({
        baseURL: UPDATE_EMPLOYEE,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
        data: this.getFormData(),
      })
        .then((res) => {
          console.log("***********");
          console.log(res.data);
          console.log("***********");
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
          window.location.href = "/" + this.state.parking_id + "/employees/";
        })
        .catch((error) => {
          // window.error = error.response.data;
          // console.log(error.response.data)
          // let error_msg = '';
          // Object.keys(error.response.data).forEach(function(e){
          //     error_msg += e + ': '+ error.response.data[e][0] + ' \n ';
          // });
          // this.setState({ error: error_msg});
          console.error(error)
          toast("Erro ao atualizar.");
        });
    } else {
      //post
      //put
      let CREATE_EMPLOYEE = `${myConfig.API_URL}/employees/?id$=&idEstacionamento=${this.props.match.params.parking_id}`;

      axios({
        baseURL: CREATE_EMPLOYEE,
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
        data: this.getFormData(),
      })
        .then((res) => {
          console.log("***********");
          console.log(res.data);
          console.log("***********");
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
          window.location.href = "/" + this.state.parking_id + "/employees/";
        })
        .catch((error) => {
          // window.error = error.response.data;
          // console.log(error.response.data)
          // let error_msg = '';
          // Object.keys(error.response.data).forEach(function(e){
          //     error_msg += e + ': '+ error.response.data[e][0] + ' \n ';
          // });
          // this.setState({ error: error_msg});
          console.error(error)
          toast("Erro ao cadastrar.");
        });
    }
  }
  render() {
    console.log(this.state.employee_id)
    console.log(this.state.parking_id)
    let select_countries;
    if (this.state.country_name.length > 0) {
      select_countries = (
        <div className="form-group">
          <SelectBox
            strong="true"
            data={this.state.country_name}
            selected_value={this.state.country}
            value={"name"}
            change={(e) => this.handleSelectCountry(e)}
            // label="Paises"
            id="select_countries"
          />
        </div>
      );
    } else {
      select_countries = (
        <div className="form-group">
          {/* <label htmlFor="">Países</label> */}
          <select className="form-control">
            <option value="">-------------</option>
          </select>
        </div>
      );
    }

    return (
      // <div className="form_employee">
      <div className="content">
        <section className="">
          <h1 style={{ color: "#007bff" }}>{this.state.title}</h1>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="007bff" />
            Voltar
          </Link>
        </section>
        <form onSubmit={this.handleSave}>
          <input
            value={this.state.nome}
            name="nome"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Nome"
          />

          <input
            value={this.state.cpf}
            name="cpf"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="CPF"
            // type="email"
          />
          <input
            value={this.state.rg}
            name="rg"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="RG"
            type="text"
          />

          {select_countries}

          <PlacesAutocomplete
            value={this.state.location}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div className="form-group">
                {/* <label htmlFor="search_place">Localidade</label> */}
                <input
                  {...getInputProps({
                    placeholder: "Procurar localidade.",
                    className: "location-search-input form-control",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <input
            value={this.state.telefone}
            name="telefone"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Telefone"
          />

          <div className="input-group">
            <input
              value={this.state.dt_nasc}
              name="dt_nasc"
              onChange={(e) => this.handleChangeText(e)}
              type="date"
              placeholder="Data Nascimento"
            />
            <input
              value={this.state.dt_ini}
              // type="date"
              name="dt_ini"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Data entrada"
            />
            <input
              value={this.state.dt_end}
              // type="date"
              name="dt_end"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Data Saída"
            />
            <input
              value={this.state.cargo}
              name="cargo"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Cargo"
            />
            <input
              value={this.state.credential}
              name="credential"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Credencial"
            />
          </div>

          <button className="button" type="submit">
            Enviar
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
export default  Form;