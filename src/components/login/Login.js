import axios from 'axios';
import { NavLink } from "react-router-dom";
import './Login.css';

function Login() {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const consumir_login = () => {
        var postData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        axios
            .post("http://localhost:8000/api/v1/login", postData, requestOptions)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                window.location.replace("http://localhost:3000/profile/");
            })
            .catch((error) => {
                console.log(error.response.data)
                if (error.response.data.username || error.response.data.password) {
                    alert("No puedes dejar campos vacios");
                }
                if (error.response.data.non_field_errors) {
                    alert("No puedes iniciar sesión con las credenciales proporcionadas")
                }
            });
    };

    function showpassword() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">

                <nav aria-label="breadcrumb" className="main-breadcrumb green">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><p>Home</p></li>
                        <li className="breadcrumb-item active">Log In</li>
                    </ol>
                </nav>

                <div className="col-md-8">
                    <div className="card-group mb-0">
                        <div className="card p-4">
                            <div className="card-body">
                                <h1>Sign In</h1>
                                <p className="text-muted">Log in to view your profile page</p>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                                    <input type="text" className="form-control" id="username" placeholder="Username" />
                                </div>
                                <div className="input-group mb-1">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock-fill"></i></span>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" onClick={showpassword} id="flexCheckDefault" />
                                    <label className="form-check-label">
                                        Show password
                                    </label>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-secondary" onClick={consumir_login}>Log In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card text-white bg-primary py-5 d-md-down-none signup">
                            <div className="card-body text-center">
                                <div>
                                    <h2>New here?</h2>
                                    <p>Register to create a new account to view your profile page.</p>
                                    <NavLink to="/register" className="btn btn-light">Sign Up</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Login;