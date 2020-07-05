import React, { Component } from "react";
// import { FiEdit, FiDelete } from "react-icons/fi";
// import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import AddButton from "../../components/Add_button";
// import Table from "react-bootstrap/Table";
import axios from "axios";
import {
  isChildrenEmpty,
  calculeTime,
  getFormatedDate,
} from "../../helpers/utils";
import { ToastContainer, toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import {} from '.'
import myConfig from "../../configs/config";
// Spinner
import "./index.css";
import Spinner from "../../components/Spinner";
import PdfContainer from "../../components/PdfContainer";
import Doc from "../../components/DocService";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicules: [],
      parking_id: this.props.match.params.parking_id,
      loading: true,
    };
    this.deleteVehicule = this.deleteVehicule.bind(this);
  }
  getVehicules() {
    let url = `${myConfig.API_URL}/cars/?id=&idEstacionamento=${parseInt(
      this.state.parking_id
    )}`;

    axios({
      baseURL: url,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
      },
    }).then((res) => {
      console.log("***********");
      console.log(res.data);
      console.log("***********");
      this.setState({ vehicules: res.data, loading: false });
    });

    this.calculateValue(50, 10);
  }
  componentDidMount() {
    this.getVehicules();
    // let url = `${myConfig.API_URL}/cars/?id=&idEstacionamento=${parseInt(this.state.parking_id)}`;

    // axios({
    //   baseURL: url,
    //   method: "get",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("parking-token")}`,
    //   },
    // }).then((res) => {
    //   console.log("***********");
    //   console.log(res.data);
    //   console.log("***********");
    //   this.setState({ vehicules: res.data,loading:false });
    // });

    // // this.calculateValue(50,10)
    // console.log("aqui componentDidMount")
  }

  deleteVehicule(id) {
    console.log(id);
    let DELETE_VEHICULE = `${myConfig.API_URL}/cars/?id=${id}&idEstacionamento=${this.state.parking_id}`;

    if (!window.confirm("Realmente deseja excluir o veículo  ?")) {
      return 0;
    } else {
      axios({
        baseURL: DELETE_VEHICULE,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("client-token")}`,
        },
      })
        // axios.delete(DELETE_IMPLEMENT)
        .then((res) => {
          // console.log(res.data)
          // alert("Implemento excluído com sucesso !");
          toast("Veículo deletado com sucesso");
          window.scrollTo(0, 0);
          window.location.href = "/" + this.state.parking_id + "/vehicules/";
        });
    }
  }
  // funcao para formatar a data
  // formatDate(date){

  // }

  calculateValue(he, hs) {
    let horas = localStorage.getItem("horas");
    // console.log(horas)
    // let meia_hora = parseInt(horas) / 2;
    // let quinze_minutos = meia_hora / 2;
    // console.log(meia_hora, quinze_minutos)
    let diaria = (44*5)/30;


    let h_enter = new Date(he);
    let h_exit = new Date(hs);
    console.log("saída ", h_exit);
    console.log("entrada ", h_enter);

    // console.log(typeof(hs))

    // console.log("h_enter", h_enter.getTime());
    // console.log("h_exit", h_exit.getTime());

    // console.log('sub ', h_exit.getTime() - h_enter.getTime() )
    // let sub = h_exit.getTime() - h_enter.getTime();

    // console.log()
    // console.log()
    // console.log()

    if (h_enter.getDate() !== h_exit.getDate()) {
      let sub = Math.abs(h_exit.getDate() - h_enter.getDate());
      console.log("*********", sub);
      console.log(diaria);
      let value;
      for (let i = 0; i < sub; i++) {
        // console.log('***************',i)
        // console.log("+++", parseInt(horas)  + i)
        console.log('iiiiiiiii',i)
        value = diaria  * i;
      }
      console.log(value);
      return value === 0 ? diaria : value
    } 
    else {
      let sub = Math.abs(h_exit - h_enter);
      // new Date(sub)
      // console.log(sub)
      // console.log("sub", formatTime(sub));
      // console.log("opa", sub.getHours())
      // console.log("************", diaria)
      // pegar total de horas
      // e a cada uma hora
      // eu somo + total de horas que vem e retorno

      return calculeTime(sub);
    }
  }

  // formatTime(time){

  // }

  createPdf = (html) => Doc.createPdf(html);

  render() {
    let content;
    // console.log(this.state.vehicules.length);
    let vagas = localStorage.getItem("vagas");
    if (this.state.loading === true) {
      content = (
        <div className="spinner">
          <Spinner loading={this.state.loading} />{" "}
        </div>
      );
    } else {
      content = (
        <ul>
          {isChildrenEmpty(
            this.state.vehicules,
            <div>
              <h1 align="center">
                Estabelecimento não possui nenhum veículo no momento
              </h1>
            </div>,
            <>
              {this.state.vehicules.map((vehicule) => (
                <li key={vehicule.id}>
                  <strong>Proprietátio: </strong>
                  <p>{vehicule.owner} </p>

                  <strong>Placa: </strong>
                  <p>{vehicule.board}</p>

                  <strong>Entrada: </strong>
                  <p>{getFormatedDate(vehicule.h_enter)}</p>

                  <strong>Saida: </strong>
                  <p>{getFormatedDate(vehicule.h_exit)}</p>

                  <strong>Valor a ser cobrado: </strong>
                  <p>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      this.calculateValue(vehicule.h_enter, vehicule.h_exit)
                    )}
                  </p>

                  <button type="button" style={{ marginRight: 30 }}>
                    <Link
                      to={`/${this.state.parking_id}/vehicules/edit/${vehicule.id}`}
                    >
                      <FiEdit2 size={20} color="#a8a8b3" />
                    </Link>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => this.deleteVehicule(vehicule.id)}
                  >
                    <FiTrash2 size={20} color="#a8a8b3" />
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      );
    }

    return (
      <div className="list_vehicule">
        <div className="title">
          {" "}
          <h3>Vagas disponíveis: {vagas - this.state.vehicules.length}</h3>
        </div>
        <ToastContainer />
        <AddButton url={`/${this.state.parking_id}/vehicules/add/`} />
        <PdfContainer createPdf={this.createPdf}>{content}</PdfContainer>
      </div>
    );
  }
}
export default List;
