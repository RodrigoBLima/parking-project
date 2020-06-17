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
      name_establishment:"",      
      country_name: [],
      cep:"",
      country:"",
      location:"",
      cnpj:"",
      vagas:"",
      email:"",
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
            name_establishment:res.data.name_establishment,      
            // country_name: [],
            cep:res.data.cep,
            country:res.data.pais,
            location:res.data.location,
            cnpj:res.data.cnpj,
            vagas:res.data.vagas,
            email:res.data.username,
         }) 
        })

        
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
    return (
      <div>
        <form onSubmit={this.handleSave}></form>
      </div>
    );
  }
}

export default Form;
