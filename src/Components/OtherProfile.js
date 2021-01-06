import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { axiosHelper } from "../Utilities/axiosHelper";

function OtherProfile() {

    const history = useHistory();
    const { id } = useParams();
    const [profileInfo, setProfileInfo] = useState({});
    const [characterSheets, setCharacterSheets] = useState([]);

    function getProfileInfo(res) {
        setProfileInfo(res.data);
        getSheet(id);
    }

    function getSheetInfo(res){
        setCharacterSheets(res.data);
    }


    function failure(err) {
        console.log(err);
    }

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
    }

    async function getProfile() {
        const method = 'get';
        const url = `https://cors-anywhere.herokuapp.com/https://ttrpgbackend.herokuapp.com/users/${id}`;
        const data = {};

        await axiosHelper(method, url, headers, getProfileInfo, data, failure)
    }

    async function getSheet(profile_id) {
        const method = 'get';
        const url = `https://cors-anywhere.herokuapp.com/https://ttrpgbackend.herokuapp.com/user/sheets/${profile_id}`;
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
                                        <button className="btn btn-primary" onClick = {() => history.push(`../characters/${item.id}`)}>
                                            {item.id}
                                        </button>
                                    </li>);
                            }) : <p>No Character Sheets</p>}
                    </ul>
                </div>
                :
                <h1> User does not exist or is still loading</h1>

            }
        </div>
    )
}

export default OtherProfile;