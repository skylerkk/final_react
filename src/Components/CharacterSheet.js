import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import { useToken } from '../Utilities/TokenContext';
import { axiosHelper } from "../Utilities/axiosHelper";

function CharacterSheet() {

    const { token } = useToken();
    const { id } = useParams();
    const [sheetInfo, setSheetInfo] = useState({});
    const [userSheet, setUserSheet] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [sheetId, setSheetId] = useState(-1);
    const history = useHistory();

    const header = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const method = 'get';

    function getSheetInfo(res) {
        if (res.data.info.length > 0) {
            setSheetInfo(res.data);
        }
    }

    function getUser(res) {
        setUserId(res.data.id);
    }

    function deleteHelper(res) {
        history.push('/profile');
    }

    function failure(err) {
        console.log(err);
    }

    async function getSheet() {
        const tokenUrl = 'http://localhost:8000/api/user';
        const sheetUrl = `http://localhost:8000/character/${id}`;
        const sheet_header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        }
        const data = {};
        await axiosHelper(method, sheetUrl, sheet_header, getSheetInfo, data, failure);
        await axiosHelper(method, tokenUrl, header, getUser, data, failure);
    }

    function deleteSheet() {
        const deleteMethod = 'post';
        const deleteUrl = 'http://localhost:8000/delete_sheet';
        const data = {
            id: sheetId
        };
        axiosHelper(deleteMethod, deleteUrl, header, deleteHelper, data, failure);
    }

    useEffect(() => {
        getSheet()
        if (Object.keys(sheetInfo).length > 0) {
            if (sheetInfo.sheet[0].user_id === userId) {
                setUserSheet(true);
                setSheetId(sheetInfo.sheet[0].id);
            }
        }
    }, [token, userId]);


    return (
        <div className="container">

            {(Object.keys(sheetInfo).length > 0 && editMode === false) ?

                sheetInfo.info.length > 0 ?
                    <div className="row">
                        <h2 className="col-6 mt-5">Character Name: {sheetInfo.info[0].character_name}</h2>
                        <h2 className="col-6 mt-5">Player Name: {sheetInfo.info[0].player_name}</h2>
                        <h5 className="col-3">Class: {sheetInfo.info[0].class}</h5>
                        <h5 className="col-3">Race: {sheetInfo.info[0].race}</h5>
                        <h5 className="col-3">Size: {sheetInfo.info[0].size}</h5>
                        <h5 className="col-3">Alignment: {sheetInfo.info[0].alignment}</h5>
                        <h5 className="col-3">Experience: Filler</h5>
                        <h5 className="col-9">Level: {sheetInfo.info[0].level}</h5>
                        <h4 className="col-12">Strength: {sheetInfo.stats[0].str}</h4>
                        <h4 className="col-12">Dexterity: {sheetInfo.stats[0].dex}</h4>
                        <h4 className="col-12">Constution: {sheetInfo.stats[0].con}</h4>
                        <h4 className="col-12">Intelligence: {sheetInfo.stats[0].int}</h4>
                        <h4 className="col-12">Wisdom: {sheetInfo.stats[0].wil}</h4>
                        <h4 className="col-12">Charisma: {sheetInfo.stats[0].cha}</h4>
                    </div>
                    :
                    <div className="row">
                        <div className='col-12 text-center'>
                            <h2 className='mt-5'>Sheet does not exist</h2>
                        </div>
                    </div>

                :
                <div>
                    <h1>Works</h1>
                    <button onClick={() => setEditMode(false)}>Save</button>
                </div>
            }

            {(userSheet && editMode === false) &&
                <div className="pt-3">
                    <div>
                        <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                    <div className='pt-2'>
                        <button className="btn btn-primary" onClick={() => deleteSheet()}>Delete</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CharacterSheet;