import { get } from "jquery";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { axiosHelper } from "../Utilities/axiosHelper";
import { useToken } from '../Utilities/TokenContext';

function OtherProfile() {

    const history = useHistory();
    const { id } = useParams();
    const [profileInfo, setProfileInfo] = useState({});
    const [characterSheets, setCharacterSheets] = useState([]);

    function getProfileInfo(res) {
        console.log(res.data);
        setProfileInfo(res.data);
        getSheet(id);
    }

    function getSheetInfo(res){
        console.log("data", res.data);
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
    }

    async function getProfile() {
        const method = 'get';
        const url = `http://localhost:8000/users/${id}`;
        const data = {};

        await axiosHelper(method, url, headers, getProfileInfo, data, failure)
    }

    async function getSheet(profile_id) {
        const method = 'get';
        const url = `http://localhost:8000/user/sheets/${profile_id}`;
        const sheet_header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        }
        const data = {};

        await axiosHelper(method, url, sheet_header, getSheetInfo, data, failure)
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="container">
            {(Object.keys(profileInfo).length) ?
                <div>
                    <h1>{profileInfo.name}</h1>
                    <h3>{profileInfo.email}</h3>
                    <h4>Character Sheets</h4>
                    <ul>
                        {characterSheets.length > 0 ?
                            characterSheets.map((item) => {
                                return (
                                    <li>
                                        <button onClick={() => history.push(`characters/${item.id}`)}>
                                            {item.id}
                                        </button>
                                    </li>);
                            }) : <p>No Character Sheets</p>}
                    </ul>
                </div>
                :
                <h1> User does not exist </h1>

            }
        </div>
    )
}

export default OtherProfile;