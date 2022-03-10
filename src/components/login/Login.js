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

    return (
        <body>
            <h1>Vista - Login</h1>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <button onClick={consumir_login}>Sign In</button>
        </body>
    );


}

export default Login;