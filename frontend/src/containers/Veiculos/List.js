import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddButton from "../../components/Add_button";
import axios from "axios";
import { isChildrenEmpty, getFormatedDate } from "../../helpers/utils";

import { ToastContainer, toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import myConfig from "../../configs/config";

import Spinner from "../../components/Spinner";
import PdfContainer from "../../components/PdfContainer";
import Doc from "../../components/DocService";
import "./index.css";

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
      // console.log("***********");
      // console.log(res.data);
      // console.log("***********");
      this.setState({ vehicules: res.data, loading: false });
    });

    this.calculateValue(50, 10);
  }
  componentDidMount() {
    this.getVehicules();
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
          toast("Veículo deletado com sucesso");
          window.scrollTo(0, 0);
          window.location.href = "/" + this.state.parking_id + "/vehicules/";
        });
    }
  }

  calculateValue(he, hs) {
    let diaria = (120 * 5) / 30;
    let h_enter = new Date(he);
    let h_exit = new Date(hs);

    if (h_enter.getDate() !== h_exit.getDate()) {
      let sub = Math.abs(h_exit.getDate() - h_enter.getDate());
      let value;
      console.log('*********if')
      for (let i = 0; i < sub; i++) {
        value = (diaria * i) / 2;
      }
      return value === 0 ? diaria : value;
    }
    else {
      let sub = Math.abs(h_exit - h_enter);
      let data = new Date(sub);
      let hour = ("0" + data.getHours()).slice(-2).toString();
      let horas = localStorage.getItem("horas");

      let value;
      for (let i = 1; i <= hour; i++) {
        value = parseInt(horas) + i;
      }

      return value;
    }
  }

  createPdf = (html) => Doc.createPdf(html);

  render() {
    let content,
      vagas = localStorage.getItem("vagas");

    if (this.state.loading === true) {
      content = (
        <div className="spinner">
          <Spinner loading={this.state.loading} />{" "}
        </div>
      );
    } else {
      content = (
        <>
          {isChildrenEmpty(
            this.state.vehicules,
            <div>
              <h1 align="center">
                Estabelecimento não possui nenhum veículo no momento
              </h1>
            </div>,
            <ul>
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
            </ul>
          )}
        </>
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
