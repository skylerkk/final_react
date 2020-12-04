import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { axiosHelper } from "../Utilities/axiosHelper";

function CharacterSheet() {

    const { id } = useParams();
    const [sheetInfo, setSheetInfo] = useState({});

    function getSheetInfo(res) {
        console.log(res);
        setSheetInfo(res.data);
    }

    function failure(err){
        console.log(err);
    }

    function getSheet() {
        const method = 'get';
        const url = `http://localhost:8000/character/${id}`;
        const sheet_header = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        }
        const data = {};
        axiosHelper(method, url, sheet_header, getSheetInfo, data, failure)
    }

    useEffect( () => {
        getSheet()
        console.log(sheetInfo)
    }, []);


    return (
        <div>
        {Object.keys(sheetInfo).length > 0 && 
            <h1>{sheetInfo.info[0].player_name}</h1>
        }
            <button onClick={() => {
                console.log('Info', sheetInfo.info[0].player_name);
            }}>Test</button>
        </div>
    )
}

export default CharacterSheet;