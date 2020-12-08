import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useToken } from '../Utilities/TokenContext';
import { axiosHelper } from '../Utilities/axiosHelper'
import axios from "axios";

function Login() {

    const { saveToken } = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }

    function success(res) {
        console.log(res);
        if (res.status == 200) {
            saveToken(res.data.access_token);
            history.push('/profile');
        }
    }

    function failure(err) {
        console.log(err)
        setError(true);
    }

    function clickHandler() {
        const method = 'post';
        const url = 'http://localhost:8000/v1/oauth/token';
        const data = { username: email, password, grant_type: "password", client_id: 2, client_secret: "iTdhY1t4jkKYzjWnFsGn73H6sTGF0olGm3W0TYF8", scope: "" };
        axiosHelper(method, url, headers, success, data, failure)
    }

    return (
        <div className="container">
            {error && <div className="alert alert-warning alert-dismissible fade show" role="alert" id='alert'>
                Invalid email and password please enter a valid credentials and try again.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setError(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}
            <div className="form-group">
                <h4>Enter Email:</h4>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
            </div>
            <div className="form-group">
                <h4>Enter Password:</h4>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="form-control" id="InputPassword" placeholder="Enter Password" />
            </div>
            <button onClick={clickHandler} className="btn btn-primary">Submit</button>
        </div>
    )
}

export default Login;