import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import "./index.css";
import LoginImg from "../../assets/img5.png";
import myConfig from "../../configs/config";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function formData() {
    const form_data = new FormData();

    form_data.append("username", email);
    form_data.append("password", password);
    form_data.append("grant_type", "password");
    form_data.append("client_id", "YOUR_CLIENT_ID");
    form_data.append("client_secret","YOUR_CLIENT_SECRET");
    
    return form_data;
  }

  function getUser() {
    try {
      const url = `${myConfig.API_URL}/parkings/me/`;
      const token = localStorage.getItem("parking-token");
      console.log(token);
      axios({
        baseURL: url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        // console.log("**************");
        // console.log(res.data);
        // console.log("**************");
        const client = res.data;
        const parking = res.data.id;
        const parking_name = res.data.name_establishment;
        const vagas = res.data.vacancies;
        const horas = res.data.value_hour;

        localStorage.setItem("parking_id", JSON.stringify(parking));
        localStorage.setItem("parking_name", parking_name);
        localStorage.setItem("parking", JSON.stringify(client));
        localStorage.setItem("vagas", vagas);
        localStorage.setItem("horas", horas);

        window.location.reload(false);
      });
    } catch (err) {
      console.log("ERROR !", err);
    }
  }

  function handleSave(e) {
    e.preventDefault();

    const LOGIN_URL = `${myConfig.BE_URL}/o/token/`;

    axios({
      baseURL: LOGIN_URL,
      method: "POST",
      data: formData(),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          localStorage.setItem("parking-token", response.data.access_token);

          getUser();
          toast("Login realizado com sucesso.");
        }
      })
      .catch((error) => {
        // console.log("ERROR", error);
        toast("Email ou senha inválidos.");
      });
    setTimeout(() => {}, 3500);
  }

  return (
    <div className="login_content">
      <section className="form">
        <form onSubmit={handleSave}>
          <h1>Faça o seu Login</h1>

          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/signup" className="back-link">
            <FiLogIn size={16} color="007bff" />
            Não tenho cadastro
          </Link>
        </form>
        <ToastContainer />
      </section>
      <img src={LoginImg} alt="loginImage" />
    </div>
  );
};

export default Login;
