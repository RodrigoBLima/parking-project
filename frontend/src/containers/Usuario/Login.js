import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import "./index.css";
import LoginImg from "../../assets/img5.png";
// import heroesImg from '../../assets/heroes.png';
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // constructor(

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: "",
  //   };
  //   // this.getFormData = this.getFormData.bind(this);
  // }

  // handleChangeText(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // }

  function formData() {
    const form_data = new FormData();

    form_data.append('username', email)
    form_data.append('password', password)

    form_data.append("grant_type", "password");
    // yHW8LOEX3J9G8qH3cNXCf30MWY1BlYtW3dJoTV3g
    form_data.append("client_id", "htZ0ScSVn5TxKhd644gmPT4XtmylavVGXncGnwlJ");

    form_data.append("client_secret","ZWFemwKs3IbLOkzq66colu1AQH0icnifigItzcFqitbALXjpcS2cyPA9ROeix82MW3Tyt4hTieJfNVbS10bFAPsMXSE3lFXNOL1UYCIsyqBY5mCE5rYk2Vwxnw7qE7RL");

    return form_data;
  }

  function getUser() {
    // console.log();  

    try {
      const url = "http://127.0.0.1:8000/api/v1/parkings/me/";
      const  token =localStorage.getItem("parking-token") 
      console.log(token)
      axios({
        baseURL: url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log('**************')
        console.log(res.data)
        console.log('**************')
        const client = res.data;
        const parking = res.data.id;
        const parking_name = res.data.name_establishment;

        localStorage.setItem("parking_id", JSON.stringify(parking));
        localStorage.setItem("parking_name", parking_name);
        localStorage.setItem("parking", JSON.stringify(client));

        window.location.reload(false);
      });
    } catch (err) {
      console.log("ERROR !", err);
    }
  }

  function handleSave(e) {
    e.preventDefault();

    const LOGIN_URL = "http://localhost:8000/o/token/";
    // const form_data = new FormData();

    // form_data.append("username","vanderdigo837@outlook.com");
    // form_data.append("password", "barbosa345");

    // form_data.append("grant_type", "password");
    // // yHW8LOEX3J9G8qH3cNXCf30MWY1BlYtW3dJoTV3g
    // form_data.append("client_id", "htZ0ScSVn5TxKhd644gmPT4XtmylavVGXncGnwlJ");

    // form_data.append("client_secret","ZWFemwKs3IbLOkzq66colu1AQH0icnifigItzcFqitbALXjpcS2cyPA9ROeix82MW3Tyt4hTieJfNVbS10bFAPsMXSE3lFXNOL1UYCIsyqBY5mCE5rYk2Vwxnw7qE7RL");

    // return form_data;
    axios({
      baseURL: LOGIN_URL,
      method: "POST",
      data: formData(),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          localStorage.setItem('parking-token', response.data.access_token);
          //
          getUser();
          toast("FOOI.");
        }
      })
      .catch((error) => {
        // setError(`Error: ${error.response.data['error_description']}`)
        console.log("ERROR", error);
      });
    setTimeout(() => {
      // setError(null)
    }, 3500);
  }

  // render() {
    return (
      <div className="login_content">
        <section className="form">
          {/* <img src={LoginImg} alt="" /> */}
          <form onSubmit={handleSave}>
            <h1>Faça o seu Login</h1>

            <input
              value={email}
              name="email"
              onChange={e => setEmail(e.target.value)}

              placeholder="Email"
            />
            <input
              value={password}
              name="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
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
  }
// }
export default Login;
