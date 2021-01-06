import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import { axiosHelper } from "../Utilities/axiosHelper";
import { useToken } from '../Utilities/TokenContext';

function Profile() {

    const { token } = useToken();
    const [userProfile, setUserProfile] = useState({});
    const [characterSheets, setCharacterSheets] = useState([]);
    const [edit, setEdit] = useState(false);
    const [nameChange, setNameChange] = useState('');
    const [emailChange, setEmailChange] = useState('');
    const history = useHistory();

    function getUserInfo(res) {
        setUserProfile(res.data);
        getSheet(res.data.id);
    }

    async function getSheetInfo(res) {
        setCharacterSheets(res.data);
    }

    function failure(err) {
        console.log(err);
    }

    // useEffect(() => {
    // }, [userProfile])

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    function getUser() {
        const method = 'get';
        const url = `api/user`;
        const data = {};
        axiosHelper(method, url, headers, getUserInfo, data, failure)
    }

    function updateUser() {
        const method = 'post';
        const url = `users/update`;
        const data = { id: userProfile.id, name: nameChange, email: emailChange };
        axiosHelper(method, url, headers, getUserInfo, data, failure)
    }

    function getSheet(profile_id) {
        const method = 'get';
        const url = `user/sheets/${profile_id}`;
        const sheet_header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        }
        const data = {};

        axiosHelper(method, url, sheet_header, getSheetInfo, data, failure)
    }

    function changeEdit() {
        if (edit == false) {
            setNameChange(userProfile.name);
            setEmailChange(userProfile.email);
        }
        else {
            updateUser();
        }
        setEdit(!edit);
    }

    useEffect(() => {
        if (token != '') {
            getUser();
        }
    }, [token]);


    return (
        <div className="container">
            {(userProfile != {} && token.length > 0) ?

                (edit === false) ?
                <div>
                    <h1>{userProfile.name}</h1>
                    <h3>{userProfile.email}</h3>
                    <button className="btn btn-primary" onClick={changeEdit}>Edit Profile Info</button>
                    <h4>Character Sheets</h4>
                    <ul>
                        {characterSheets != [] ?
                            characterSheets.map((item) => {
                                return (
                                    <li>
                                        <button className="btn btn-primary" onClick = {() => history.push(`characters/${item.id}`)}>
                                            {item.id}
                                        </button>
                                    </li>);
                            }) : <p>No Sheets</p>}
                    </ul>
                </div>
                :
                <div>
                    <div className="form-group">
                        <h4>Name:</h4>
                        <input onChange={e => setNameChange(e.target.value)} value={nameChange} type="text" className="form-control" id="InputName" aria-describedby="emailHelp" placeholder="Enter Name" />
                    </div>
                    <div className="form-group">
                        <h4>Email:</h4>
                        <input onChange={e => setEmailChange(e.target.value)} value={emailChange} type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
                    </div>
                    <button className="btn btn-primary" onClick={changeEdit}>Save Changes</button>
                </div>
                :
                <h1>Loading User or User is not Found</h1>
            }

        </div>
    )
}

export default Profile;