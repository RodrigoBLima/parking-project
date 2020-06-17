import React, { Component } from "react";
import myConfig from "../../configs/config";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SelectBox from "../../components/SelectBox";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   establishment: [],
      parking_id: this.props.match.params.parking_id,
      name_establishment: "",
      country_name: [],
      cep: "",
      country: "",
      location: "",
      cnpj: "",
      vagas: "",
      email: "",
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { parking_id } = this.state;
    let ESTABLISHMENT_URL = `${myConfig.API_URL}/parkings/${parking_id}/`;
    axios({
      baseURL: ESTABLISHMENT_URL,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
    }).then((res) => {
      console.log("***********++++++++");
      console.log(res.data);
      console.log("***********++++++++");
      this.setState({
        name_establishment: res.data.name_establishment,
        // country_name: [],
        cep: res.data.cep,
        country: res.data.pais,
        location: res.data.location,
        cnpj: res.data.cnpj,
        vagas: res.data.vagas,
        email: res.data.username,
      });
    });

    // GET COUNTRIES
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
  }

  getFormData() {
    const form_data = new FormData();

    form_data.append("name_establishment", this.state.name_establishment);
    form_data.append("cep", this.state.cep);
    form_data.append("pais", this.state.country);
    form_data.append("cnpj", this.state.cnpj);
    form_data.append("location", this.state.location);
    form_data.append("vagas", this.state.vagas);
    form_data.append("email", this.state.email);
    form_data.append("username", this.state.email);
    // form_data.append("dt_end", this.state.dt_end);
    // form_data.append("dt_ini", this.state.dt_ini);
    // form_data.append("dt_nasc", this.state.dt_nasc);
    // form_data.append("idEstacionamento", this.state.parking_id);

    return form_data;
  }
  handleSave(e) {
    e.preventDefault();
    let UPDATE_ESTABLISHMENT = `${myConfig.API_URL}/parkings/${this.state.parking_id}/`;

    axios({
      baseURL: UPDATE_ESTABLISHMENT,
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
          localStorage.setItem("parking_name", res.data.name_establishment);
          toast("Atualizado com sucesso!");
        }
        setTimeout(() => {
          // this.setState({
          //     submited_update: false,
          // });
        }, 8000);
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
        console.error(error);
        toast("Erro ao atualizar.");
      });
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
      <div className="content">
        <form onSubmit={this.handleSave}>
          <input
            value={this.state.name_establishment}
            name="name_establishment"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Nome do estabelecimento"
            // type="email"
          />

          <input
            value={this.state.email}
            name="email"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="E-mail"
            // type="email"
          />

          <input
            value={this.state.vagas}
            name="vagas"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Quantidade de vagas"
            type="number"
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
            value={this.state.cep}
            name="cep"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="CEP"
            // type="email"
          />
          <input
            value={this.state.cnpj}
            name="cnpj"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="CNPJ da empresa"
            // type="email"
          />
          <button className="button" type="submit">
            Atualizar
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Form;
