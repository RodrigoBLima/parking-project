import React, { Component } from "react";
import { FiEdit2, FiDelete, FiTrash2 } from "react-icons/fi";
// import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import AddButton from "../../components/Add_button";
// import Table from "react-bootstrap/Table";
// import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import axios from "axios";
import { isChildrenEmpty } from "../../helpers/utils";

export default class List extends Component {
  state = {
    employees: [],
    parking_id: this.props.match.params.parking_id,
  };

  componentDidMount() {
    const URL = `http://127.0.0.1:8000/api/v1/employees/?id=&idEstacionamento=${this.state.parking_id}`;

    axios({
      baseURL: URL,
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

    // try {
    //   // const res =
    //   api.get("employees/?parking_id=1").then((res) => {
    //     console.log("***********");
    //     console.log(res.data);
    //     console.log("***********");
    //     this.setState({ employees: res.data });
    //   });
    // } catch (e) {
    //   toast("Erro ao buscar dados dos paises.");
    // }
  }

  deleteEmployee(id) {
    console.log(id);
    let DELETE_EMPLOYEE = `http://127.0.0.1:8000/api/v1/employees/?id=${id}&idEstacionamento=${this.state.parking_id}`;

        if (!window.confirm('Realmente deseja excluir o veículo  ?')) {
            return 0;
        } else {
            axios({
                baseURL: DELETE_EMPLOYEE,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('client-token')}`
                },
            })
                // axios.delete(DELETE_IMPLEMENT)
                .then(res => {
                    // console.log(res.data)
                    // alert("Implemento excluído com sucesso !");
                    toast('Funcionário deletado com sucesso')
                    window.scrollTo(0, 0);
                    window.location.href = "/"+this.state.parking_id +"/";
                });
        }
  }

  render() {
    let content;

    content = (
      <ul>
        {isChildrenEmpty(
          this.state.employees,
          <div>
            <h1 align="center">
              Estabelecimento não possui nenhum funcionário
            </h1>
          </div>,
          <>
            {this.state.employees.map((employee) => (
              <li key={employee.id}>
                <strong>Nome: </strong>
                <p>{employee.nome} </p>

                <strong>Cargo: </strong>
                <p>{employee.cargo}</p>

                <strong>Credencial: </strong>
                <p>{employee.credential}</p>

                <strong>RG: </strong>
                <p>{employee.rg}</p>

                <button type="button" style={{ marginRight: 30 }}>
                  <Link
                    to={`/${this.state.parking_id}/employees/edit/${employee.id}`}
                  >
                    <FiEdit2 size={20} color="#a8a8b3" />
                  </Link>
                </button>

                <button
                  type="button"
                  onClick={(e) => this.deleteEmployee(employee.id)}
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
      <div className="list_employee">
        <AddButton url={`/${this.state.parking_id}/employees/add/`} />
        <ToastContainer />
        {content}
      </div>
    );
  }
}
