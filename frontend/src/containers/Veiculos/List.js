import React, { Component } from "react";
// import { FiEdit, FiDelete } from "react-icons/fi";
// import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import AddButton from "../../components/Add_button";
// import Table from "react-bootstrap/Table";
import axios from "axios";
import { isChildrenEmpty } from "../../helpers/utils";
import { ToastContainer, toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import {} from '.'

import './index.css'

class List extends Component {
  state = {
    vehicules: [],
    parking_id: this.props.match.params.parking_id,
  };

  componentDidMount() {
    let url = `http://127.0.0.1:8000/api/v1/cars/?id=&idEstacionamento=${this.state.parking_id}`;

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
      this.setState({ vehicules: res.data });
    });
  }

  deleteVehicule(id) {
    console.log(id);
    let DELETE_VEHICULE = `http://127.0.0.1:8000/api/v1/cars/?id=${id}&idEstacionamento=${this.state.parking_id}`;

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
          window.location.href = "/" + this.state.parking_id + "/";
        });
    }
  }

  render() {
    let content;
console.log(this.state.vehicules.length)
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
                <p>{vehicule.proprietario} </p>

                <strong>Placa: </strong>
                <p>{vehicule.placa}</p>

                <strong>Entrada: </strong>
                <p>{vehicule.h_entrada}</p>

                <strong>Saida: </strong>
                <p>{vehicule.h_saida}</p>

                <button type="button" style={{ marginRight: 30 }}>
                  <Link
                    to={`/${this.state.parking_id}/vehicules/edit/${vehicule.id}`}
                  >
                    <FiEdit2 size={20} color="#a8a8b3" />
                  </Link>
                </button>

                <button
                  type="button"
                  onClick={(e) => this.deleteEmployee(vehicule.id)}
                >
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    );

    return (
      <div className="list_vehicule">
        <ToastContainer />
        <AddButton url={`/${this.state.parking_id}/vehicules/add/`} />
        {content}
      </div>
    );
  }
}
export default List;
