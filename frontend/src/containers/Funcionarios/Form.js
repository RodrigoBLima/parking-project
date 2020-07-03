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
import { getFormatedDate } from "../../helpers/utils";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    nome: "",
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
    // horas:"",
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
getEmployee(){

}

getCountries(){

}
createEmployee(){

}
updateEmployee(){

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
      console.log("oporra",this.state.employee_id)
      let EMPLOYEE_URL = "http://127.0.0.1:8000/api/v1/employees/?id="+this.state.employee_id+"&idEstacionamento="+this.state.parking_id

      axios({
        baseURL: EMPLOYEE_URL,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
        },
      }).then((res) => {
        console.log("***********++++++++");
        // console.log(res.data[0]);
        console.log(res.data)
        console.log("***********++++++++");
        let data = res.data[0];

        this.setState({
          title: "Atualizar dados",
          name: data.name,
          credential: data.credential,
          cellphone: data.cellphone,
          cpf: data.cpf,
          rg: data.rg,
          country:data.country ,
          // horas: data.horas,
          location: data.location,
          office: data.office,
          dt_nasc: data.nasc,
          dt_ini: data.dt_ini,
          dt_end: data.dt_end,
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
    this.setState({
      dt_ini:e
    })
  }
  handleEndDateChange(e) {
    console.log("end", e);
    this.setState({dt_end:e})
  }
  handleEndDateNasc(e) {
    console.log("end", e);
    this.setState({dt_nasc:e})
  }
  getFormData() {
    const form_data = new FormData();

    form_data.append("nome", this.state.nome);
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
    if(this.state.employee_id !== undefined){
    form_data.append("id", parseInt(this.state.employee_id));
  }
    return form_data;
  }

  handleSave(e) {
    e.preventDefault();
    // console.log(this.state.nome)
    let {employee_id,parking_id}=this.state
    // console.log(this.state.employee_id)
    console.log(employee_id !== undefined)
    if (employee_id !== undefined){
      //put
      // console.log('TA NA PORRA DO PUT SIM')
      let UPDATE_EMPLOYEE = `${myConfig.API_URL}/employees/${employee_id}/`;
      // `${myConfig.API_URL}/employees/?id=${id}&idEstacionamento=${this.state.parking_id}`
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
        <div className="form-group">

<label htmlFor="">Nome do funcionário</label>

          <input
            value={this.state.nome}
            name="nome"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="Nome"
          />
          </div>
          <div className="form-group">

<label htmlFor="">CPF do funcionário</label>


          <input
            value={this.state.cpf}
            name="cpf"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="CPF"
            // type="email"
          />
          </div>
          <div className="form-group">

<label htmlFor="">RG do funcionário</label>

          <input
            value={this.state.rg}
            name="rg"
            onChange={(e) => this.handleChangeText(e)}
            placeholder="RG"
            type="text"
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

          {/* <div className="input-group"> */}
            <input
              value={this.state.dt_nasc}
              name="dt_nasc"
              onChange={(e) => this.handleEndDateNasc(e.target.value)}
              type="datetime-local"
              placeholder="Data Nascimento"
            />
            </div>
          
            <div className="form-group">

<label htmlFor="">cargo</label>

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