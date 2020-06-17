import React, { Component } from 'react';
import myConfig from '../../configs/config'
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
    constructor(props){
        super(props);
        this.state ={
            establishment:[],
            parking_id:this.props.match.params.parking_id,
        }
        this.handleSave = this.handleSave.bind(this);

    }

    componentDidMount(){

    }
    getFormData() {
        const form_data = new FormData();
        // name_establishment  = models.CharField(max_length=150,blank=False, verbose_name="Nome do Estabelecimento")
        // cep = models.CharField(max_length=9, blank=True,verbose_name="CEP")
        // endereco = models.CharField(max_length=50, verbose_name="Endereço", blank=True)
        // vagas = models.IntegerField(verbose_name="Vagas", blank=True,null=True)
        // pais = models.ForeignKey('location.Country', on_delete=models.PROTECT, verbose_name="País", related_name='establishment_country',default=32)
        // cidade = models.CharField(max_length=80, verbose_name="Localidade", default="")
        // numero = models.CharField(max_length=6, verbose_name="Número", blank=True)
        // cnpj = models.CharField(max_length=15, null=True, blank=True,verbose_name="CNPJ")
        // email 
    
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
    handleSave(e){
        e.preventDefault()


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
                <form onSubmit={this.handleSave}>

                </form>
            </div>
        );
    }
}

export default Form;