import axios from 'axios';
import { NavLink } from "react-router-dom";

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
            username: document.getElementById('usernameReg').value,
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
                console.log(error.response.data);
            });
    };

    return (
        <div>
            <input type="text" id="first_name" placeholder="First name" />
            <input type="text" id="last_name" placeholder="Last name" />
            <input type="text" id="usernameReg" placeholder="Username" />
            <input type="text" id="email" placeholder="Email" />
            <input type="text" id="password" placeholder="Password" />
            <input type="text" id="password2" placeholder="Confirm password" />
            <button onClick={consumir_register}>Register</button>
        </div>
    );
}

export default Register;