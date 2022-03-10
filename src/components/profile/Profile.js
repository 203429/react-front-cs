import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";
import './Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id_user: 0,
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            url_img: "",
        }
        this.updateProfile = this.updateProfile.bind(this)
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/v1/profile/" + localStorage.getItem('user_id'), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                if (res.data.pay_load == "Profile not found") {
                    this.createProfile();
                }
                if (res.data.url_img == null) {
                    document.getElementById('loadimage').src = "http://localhost:8000/assets/img-userProfile/default-profile-img.jpg";
                } else {
                    var img = "http://localhost:8000" + res.data.url_img;
                    document.getElementById('loadimage').src = img;
                }
                this.setState({
                    id_user: res.data.id_user,
                    username: res.data.username,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    email: res.data.email,
                    url_img: img
                });
            })
    }

    createProfile() {
        let postData = {
            id_user: localStorage.getItem('user_id')
        }
        axios
            .post("http://localhost:8000/api/v1/profile/", postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                console.log("Status: " + res.data.status);
                console.log(res.data)
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    updateProfile() {
        let first_name = document.getElementById('first_name').value;
        let last_name = document.getElementById('last_name').value;
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let img = document.getElementById('img').value;

        if (img != "" && (first_name != this.state.first_name || last_name != this.state.last_name || username != this.state.username || email != this.state.email)) {
            this.updateInfo();
            this.updateImage();
            console.log('Actualiza todo')
        }
        if (first_name != this.state.first_name || last_name != this.state.last_name || username != this.state.username || email != this.state.email) {
            this.updateInfo();
            console.log('Actualiza datos')
        }
        if (img != "") {
            this.updateImage();
            console.log('Actualiza imagen')
        }
    }

    updateImage() {
        let putData = new FormData();
        putData.append('id_user', localStorage.getItem('user_id'))
        putData.append('url_img', document.getElementById('img').files[0])

        axios
            .put("http://localhost:8000/api/v1/profile/" + localStorage.getItem('user_id'), putData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data)
            })

    }

    updateInfo() {
        let putData = new FormData();
        putData.append('first_name', document.getElementById('first_name').value);
        putData.append('last_name', document.getElementById('last_name').value);
        putData.append('username', document.getElementById('username').value);
        putData.append('email', document.getElementById('email').value);

        axios
            .put("http://localhost:8000/api/v1/profile/info/" + localStorage.getItem('user_id'), putData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    deleteImage() {
        let result = window.confirm('You profile image will be deleted')
        console.log(result)

        if (result) {
            axios
                .delete("http://localhost:8000/api/v1/profile/" + localStorage.getItem('user_id'), {
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                    },
                })
                .then(res => {
                    console.log(res.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error.response);
                })
        } else {
            window.location.reload();
        }
    }

    logout() {
        localStorage.clear();
        window.location.replace("http://localhost:3000/login");
    }

    editON() {
        document.getElementById('form').style.display = "block"
        document.getElementById('bg').style.display = "none"
    }

    editOFF() {
        document.getElementById('form').style.display = "none"
        document.getElementById('bg').style.display = "block"
    }

    render() {
        return (
            <div className="container">
                <div className="main-body1" id="bg">
                    <nav aria-label="breadcrumb" className="main-breadcrumb green">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><p>Home</p></li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="" id="loadimage" alt="Image not found" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{this.state.username}</h4>
                                            <p className="text-muted font-size-sm">{this.state.email}</p>
                                            <button type="button" className="btn btn-danger" onClick={this.logout}>Log out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Username</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.username}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">First Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.first_name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Last Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.last_name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <button type="button" className="btn btn-warning" onClick={this.editON}>Edit Profile</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-body2" id="form">
                    <div >
                        <div >
                            <h4>Edit Profile</h4>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Username</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control" id="username" defaultValue={this.state.username} aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">First Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control" id="first_name" defaultValue={this.state.first_name} aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Last Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control" id="last_name" defaultValue={this.state.last_name} aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" className="form-control" id="email" defaultValue={this.state.email} aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Profile Image</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="file" accept="image/*" id="img" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-13">
                                            <button type="button" className="btn btn-success me-md-2" onClick={this.updateProfile}>Save</button>
                                            <button type="button" className="btn btn-secondary me-md-5" onClick={this.editOFF}>Exit</button>
                                            <button type="button" className="btn btn-danger" onClick={this.deleteImage}>Delete profile image</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default Profile;