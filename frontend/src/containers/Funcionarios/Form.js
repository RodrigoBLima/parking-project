import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SelectBox from "../../components/SelectBox";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import myConfig from "../../configs/config";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      credential: "",
      cellphone: "",
      cpf: "",
      rg: "",
      country: 32,
      country_name: [],
      location: "",
      office: "",
      dt_nasc: "",
      dt_ini: "",
      dt_end: "",
      employee_id:
        this.props.match.params.employee_id === undefined
          ? -1
          : parseInt(this.props.match.params.employee_id),
      parking_id: this.props.match.params.parking_id,
      title: "Cadastrar funcionário",
    };
    this.handleSave = this.handleSave.bind(this);
  }

  getEmployee() {
    const { employee_id, parking_id } = this.state;
    let EMPLOYEE_URL = `${myConfig.API_URL}/employees/?id=${this.state.employee_id}&idEstacionamento=${this.state.parking_id}`;

    axios({
      baseURL: EMPLOYEE_URL,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
    }).then((res) => {
      // console.log("***********++++++++");
      // console.log(res.data);
      // console.log("***********++++++++");
      let data = res.data[0];

      this.setState({
        title: "Atualizar dados",
        name: data.name,
        credential: data.credential,
        cellphone: data.cellphone,
        cpf: data.cpf,
        rg: data.rg,
        country: data.country,
        location: data.location,
        office: data.office,
        dt_nasc: data.dt_nasc.replace(":00Z", ""),
        dt_ini: data.dt_ini.replace(":00Z", ""),
        dt_end: data.dt_end.replace(":00Z", ""),
      });
    });
  }

  getCountries() {
    const PAIS_URL = `${myConfig.API_URL}/countries/`;

    axios({
      baseURL: PAIS_URL,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
    }).then((res) => {
      // console.log("***********");
      // console.log(res.data);
      // console.log("***********");
      this.setState({ country_name: res.data });
    });
  }
  createEmployee() {
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
        // console.log("***********");
        // console.log(res.data);
        // console.log("***********");
        if (res.status === 201) {
          toast("Cadastrado com sucesso!");
        }
        setTimeout(() => {
          // console.log("CREATING ...")
        }, 3000);
        window.location.href = "/" + this.state.parking_id + "/employees/";
      })
      .catch((error) => {
        // console.error(error);
        toast("Erro ao cadastrar.");
      });
  }

  updateEmployee() {
    let UPDATE_EMPLOYEE = `${myConfig.API_URL}/employees/${this.state.employee_id}/`;

    axios({
      baseURL: UPDATE_EMPLOYEE,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
      data: this.getFormData(),
    })
      .then((res) => {
        // console.log("***********");
        // console.log(res.data);
        // console.log("***********");
        if (res.status === 200) {
          toast("Atualizado com sucesso!");
        }
        setTimeout(() => {
          // console.log('UPDATING ..')
        }, 3000);
        window.location.href = "/" + this.state.parking_id + "/employees/";
      })
      .catch((error) => {
        // console.error(error);
        toast("Erro ao atualizar.");
      });
  }

  componentDidMount() {
    if (this.state.employee_id !== -1) {
      this.getEmployee();
    }
    this.getCountries();
  }

  handleChangeText(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelectCountry(e) {
    e.preventDefault();

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
    // console.log("init", e);
    this.setState({
      dt_ini: e,
    });
  }
  handleEndDateChange(e) {
    // console.log("end", e);
    this.setState({ dt_end: e });
  }
  handleEndDateNasc(e) {
    console.log("end", e);
    this.setState({ dt_nasc: e });
  }
  getFormData() {
    const form_data = new FormData();

    form_data.append("name", this.state.name);
    form_data.append("office", this.state.office);
    form_data.append("country", this.state.country);
    form_data.append("credential", this.state.credential);
    form_data.append("location", this.state.location);
    form_data.append("rg", this.state.rg);
    form_data.append("cellphone", this.state.cellphone);
    form_data.append("cpf", this.state.cpf);
    form_data.append("dt_end", this.state.dt_end);
    form_data.append("dt_ini", this.state.dt_ini);
    form_data.append("dt_nasc", this.state.dt_nasc);
    form_data.append("idEstacionamento", parseInt(this.state.parking_id));
    if (this.state.employee_id !== undefined) {
      form_data.append("id", parseInt(this.state.employee_id));
    }
    return form_data;
  }

  handleSave(e) {
    e.preventDefault();

    let { employee_id, parking_id } = this.state;

    if (employee_id !== -1) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  render() {
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
            label="Paises"
            id="select_countries"
          />
        </div>
      );
    } else {
      select_countries = (
        <div className="form-group">
          <label htmlFor="">Países</label>
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

        <form
          onSubmit={this.handleSave}
          style={{ marginTop: "220px", marginLeft: "40px" }}
        >
          <div className="form-group">
            <label htmlFor="">Nome do funcionário</label>
            <input
              value={this.state.name}
              name="name"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="">CPF do funcionário</label>

            <input
              value={this.state.cpf}
              name="cpf"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="CPF"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              title="Digite o CPF no formato nnn.nnn.nnn-nn"
              maxLength={17}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="">RG do funcionário</label>
            <input
              value={this.state.rg}
              name="rg"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="RG"
              pattern="\d{2}\.\d{3}\.\d{3}-\d{1}"
              title="Digite o CPF no formato 00.000.000-0"
              required
            />
          </div>

          {select_countries}

          <PlacesAutocomplete
            value={this.state.location}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div className="form-group">
                <label htmlFor="search_place">Localidade</label>
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

          <div className="form-group">
            <label htmlFor="">Telefone do funcionário</label>
            <input
              value={this.state.cellphone}
              name="cellphone"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Telefone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Data de nascimento</label>

            <input
              value={this.state.dt_nasc}
              name="dt_nasc"
              onChange={(e) => this.handleEndDateNasc(e.target.value)}
              type="datetime-local"
              placeholder="Data Nascimento"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Cargo</label>
            <input
              value={this.state.office}
              name="office"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Cargo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Credencial</label>
            <input
              value={this.state.credential}
              name="credential"
              onChange={(e) => this.handleChangeText(e)}
              placeholder="Credencial"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Data de entrada</label>
            <input
              value={this.state.dt_ini}
              type="datetime-local"
              name="dt_ini"
              onChange={(e) => this.handleInitDateChange(e.target.value)}
              placeholder="Data entrada"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Data Demissão</label>
            <input
              value={this.state.dt_end}
              type="datetime-local"
              name="dt_end"
              onChange={(e) => this.handleEndDateChange(e.target.value)}
              placeholder="Data Saída"
              required
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
export default Form;
