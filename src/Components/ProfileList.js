import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { axiosHelper } from "../Utilities/axiosHelper";

function ProfileList() {


    const [allUsers, getAllUsers] = useState([]);
    const history = useHistory();

    function getUserInfo(res) {
        getAllUsers(res.data);
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

    function getSheet() {
        const method = 'get';
        const url = `all_users`;
        const data = {};

        axiosHelper(method, url, headers, getUserInfo, data, failure)
    }

    useEffect(() => {
        getSheet();
    }, []);

    return (
        <div className="container">
            {allUsers.length > 0 ? 
                <div>
                    <h1>User List:</h1>
                    <ul>
                        {allUsers.map((item, index) => {
                            return(<li>
                                <button className="btn btn-primary" onClick={()=> history.push(`/profiles/${item.id}`)}>{item.email}</button>
                            </li>);
                        })}
                    </ul>
                </div>
                :
                <h1> No Users or they are loading </h1>

            }
        </div>
    )
}

export default ProfileList;