import React, { useState } from "react";
import { axiosHelper } from "../Utilities/axiosHelper";
import { useToken } from '../Utilities/TokenContext';
import { useHistory } from 'react-router-dom';

function Signup() {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { saveToken } = useToken();


    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }

    function success(res) {
        console.log(res.data.data.token);
        if (res.status === 200) {
            saveToken(res.data.data.token);
            history.push('/profile');
        }
    }

    function failure(err) {
        console.log(err);
    }

    function clickHandler() {

        const method = 'post';
        const url = 'http://localhost:8000/register';
        const data = { name, email, password };

        axiosHelper(method, url, headers, success, data, failure);
    }

    return (
        <div className="container">
            <div className="form-group">
                <h4>Name:</h4>
                <input onChange={e => setname(e.target.value)} value={name} type="text" className="form-control" id="InputName" aria-describedby="emailHelp" placeholder="Enter Name" />
            </div>
            <div className="form-group">
                <h4>Email:</h4>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
            </div>
            <div className="form-group">
                <h4>New Password:</h4>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="form-control" id="InputPassword" placeholder="Enter Password" />
            </div>
            <button onClick={clickHandler} className="btn btn-primary">Submit</button>
        </div>
    )
}

export default Signup;