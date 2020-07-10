import React, { useState } from "react";
import "./index.css";
import myConfig from "../../configs/config";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

export default function Register() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const [name_establishment, setEst] = useState("");

  const history = useHistory();

  function handleRegister(e) {
    e.preventDefault();

    const data = {
      username,
      password,
      name_establishment,
      c_password,
      email: username,
    };

    let url = myConfig.API_URL + "/parkings/";
    axios({
      baseURL: url,
      method: "post",
      data: data,
    })
      .then((res) => {
        if (res.status === 201) {
          toast(`Cadastro realizado com sucesso !`);
        }
        setTimeout(() => {
          history.push("/login/");
        }, 5000);
      })
      .catch((error) => {        
        let error_msg = "";
        Object.keys(error.response.data).forEach(function (e) {
          error_msg += e + ": " + error.response.data[e][0] + " - ";
        });
        toast(error_msg);
      });
  }

  return (
    <div className="signup_content">
      <div className="content">
        <section className="">
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e desfrute do melhor sistema
            de controle de estacionamento do Brasil.
          </p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="007bff" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            value={name_establishment}
            onChange={(e) => setEst(e.target.value)}
            placeholder="Nome do Estacionamento"
          />

          <input
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="E-mail"
            type="email"
          />

          <div className="input-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              type="password"
            />
          </div>

          <input
            value={c_password}
            onChange={(e) => setCPassword(e.target.value)}
            placeholder="Confirmar senha"
            type="password"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
