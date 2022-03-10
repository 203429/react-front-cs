import axios from 'axios';
import { NavLink } from "react-router-dom";
import './Register.css'

function Register() {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const consumir_register = () => {
        var postData = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password2: document.getElementById('password2').value
        }

        axios
            .post("http://localhost:8000/api/v1/register", postData, requestOptions)
            .then(response => {
                console.log(response.data);
                alert("Usuario registrado")
                window.location.replace("http://localhost:3000/login");
            })
            .catch((error) => {
                if (error.response.data.username != null) {
                    if (error.response.data.username[0] == "Ya existe un usuario con ese nombre.") {
                        alert("Username: Ya existe un usuario con ese nombre.");
                    }
                    if (error.response.data.username[0] == "Este campo no puede estar en blanco.") {
                        alert("Username: Este campo no puede estar en blanco.");
                    }
                }
                if(error.response.data.email != null){
                    if(error.response.data.email[0] == "Introduzca una dirección de correo electrónico válida."){
                        alert("Email: Introduzca una dirección de correo electrónico válida.");
                    }
                    if(error.response.data.email[0] == "Este campo no puede estar en blanco."){
                        alert("Email: Este campo no puede estar en blanco.")
                    }
                    if(error.response.data.email[0] == "Este campo debe ser único."){
                        alert("Email: Este campo debe ser único.")
                    }
                }
                if (error.response.data.password != null) {
                    if (error.response.data.password[0] == "Password fields didn't match.") {
                        alert("Contraseña: Las contraseñas no coinciden");
                    }
                    if (error.response.data.password[0] == "La contraseña es muy corta. Debe contener al menos 8 caracteres.") {
                        alert("Contraseña: La contraseña es muy corta. Debe contener al menos 8 caracteres.");
                    }
                    if (error.response.data.password[0] == "Esta contraseña es muy común.") {
                        alert("Contraseña: Esta contraseña es muy común.");
                    }
                    if (error.response.data.password[0] == "Este campo no puede estar en blanco.") {
                        alert("Contraseña: Este campo no puede estar en blanco.");
                    }
                    if (error.response.data.password2[0] == "Este campo no puede estar en blanco.") {
                        alert("Contraseña: Este campo no puede estar en blanco.");
                    }
                }
                alert(error.response.data);
            });
    };

    function showpassword() {
        var x = document.getElementById("password");
        var y = document.getElementById("password2");
        if (x.type === "password" && y.type === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">

                <nav aria-label="breadcrumb" className="main-breadcrumb green">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><p>Home</p></li>
                        <li className="breadcrumb-item active">Register</li>
                    </ol>
                </nav>

                <div className="col-md-8">
                    <div className="card-group mb-0">
                        <div className="card text-white bg-primary py-5 d-md-down-none signup">
                            <div className="card-body text-center bg-card">
                                <div>
                                    <h2>Already have an account?</h2>
                                    <p>Sign in to view your profile page.</p>
                                    <NavLink to="/login" className="btn btn-light">Sign In</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="card p-4">
                            <div className="card-body">
                                <h1>Sign Up</h1>
                                <p className="text-muted">Register to create your profile page</p>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-circle"></i></span>
                                    <input type="text" className="form-control" id="username" placeholder="Username" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                                    <input type="text" className="form-control" id="first_name" placeholder="First name" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                                    <input type="text" className="form-control" id="last_name" placeholder="Last name" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-envelope-fill"></i></span>
                                    <input type="text" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-shield-lock-fill"></i></span>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <div className="input-group mb-1">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-shield-lock-fill"></i></span>
                                    <input type="password" className="form-control" id="password2" placeholder="Confirm password" />
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onClick={showpassword} id="flexCheckDefault" />
                                    <label className="form-check-label">
                                        Show password
                                    </label>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-secondary" onClick={consumir_register}>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;