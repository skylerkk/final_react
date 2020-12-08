import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import { axiosHelper } from "../Utilities/axiosHelper";
import { useToken } from '../Utilities/TokenContext';

function CreateCharacterSheet() {

    const { token } = useToken();
    const [characterName, setCharacterName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [classs, setClasss] = useState('');
    const [size, setSize] = useState('');
    const [alignment, setAlignment] = useState('');
    const [characterRace, setCharacterRace] = useState('');
    const [experience, setExperience] = useState('');
    const [level, setLevel] = useState();
    const [str, setStr] = useState('');
    const [dex, setDex] = useState('');
    const [con, setCon] = useState('');
    const [int, setInt] = useState('');
    const [wis, setWis] = useState('');
    const [cha, setCha] = useState('');
    const history = useHistory();

    async function clickHandler() {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const user_method = 'get';
        const user_url = `http://localhost:8000/api/user`;
        const user_data = {};
        let userInfo = await axiosHelper(user_method, user_url, headers, getUserInfo, user_data, failure)
        const method = 'post';
        const url = `http://localhost:8000/create_sheet`;
        const data = {id: userInfo.data.id, character_name: characterName, player_name: playerName, class: classs, level, size, alignment, race: characterRace, str, dex, con, int, wil: wis, cha};
        axiosHelper(method, url, headers, success, data, failure);
        history.push("/");
    }

    function getUserInfo(res){
        return res;
    }
    function success(res){
        console.log(res);
    }
    function failure(res){
        console.log(res);
    }

    return (
        <div className="container">
            <div className='row'>
                <h2 className="pt-4 text-center col-12">Create a Character Sheet!</h2>
                <div className="form-group col-6 pt-3">
                    <h5>Character Name:</h5>
                    <input onChange={e => setCharacterName(e.target.value)} value={characterName} type="text" className="form-control" id="InputCharacterName" aria-describedby="emailHelp" placeholder="Enter Character Name" />
                </div>
                <div className="form-group col-6 pt-3">
                    <h5>Player Name:</h5>
                    <input onChange={e => setPlayerName(e.target.value)} value={playerName} type="text" className="form-control" id="InputPlayerName" aria-describedby="emailHelp" placeholder="Enter Player Name" />
                </div>
                <div className="form-group col-2">
                    <h5>Race:</h5>
                    <input onChange={e => setCharacterRace(e.target.value)} value={characterRace} type="text" className="form-control" id="InputCharacterRace" aria-describedby="emailHelp" placeholder="Race" />
                </div>
                <div className="form-group col-2">
                    <h5>Class:</h5>
                    <input onChange={e => setClasss(e.target.value)} value={classs} type="text" className="form-control" id="InputClass" aria-describedby="emailHelp" placeholder="Class" />
                </div>
                <div className="form-group col-2">
                    <h5>Size:</h5>
                    <input onChange={e => setSize(e.target.value)} value={size} type="text" className="form-control" id="InputSize" aria-describedby="emailHelp" placeholder="Size" />
                </div>
                <div className="form-group col-2">
                    <h5>Alignment:</h5>
                    <input onChange={e => setAlignment(e.target.value)} value={alignment} type="text" className="form-control" id="InputPlayerName" aria-describedby="emailHelp" placeholder="Alignment" />
                </div>
                <div className="form-group col-4">
                    <h5>Level:</h5>
                    <input onChange={e => setLevel(e.target.value)} value={level} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Level" />
                </div>
                <div className="form-group col-2">
                    <h5>Strength:</h5>
                    <input onChange={e => setStr(e.target.value)} value={str} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Strength" />
                </div>
                <div className="form-group col-2">
                    <h5>Dexterity:</h5>
                    <input onChange={e => setDex(e.target.value)} value={dex} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Dexterity" />
                </div>
                <div className="form-group col-2">
                    <h5>Constution:</h5>
                    <input onChange={e => setCon(e.target.value)} value={con} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Constution" />
                </div>
                <div className="form-group col-2">
                    <h5>Intelligence:</h5>
                    <input onChange={e => setInt(e.target.value)} value={int} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Intelligence" />
                </div>
                <div className="form-group col-2">
                    <h5>Wisdom:</h5>
                    <input onChange={e => setWis(e.target.value)} value={wis} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Wisdom" />
                </div>
                <div className="form-group col-2">
                    <h5>Charisma:</h5>
                    <input onChange={e => setCha(e.target.value)} value={cha} type="number" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Charisma" />
                </div>
                <button onClick={clickHandler} className="btn btn-primary">Submit</button>

            </div>

        </div>
    )
}

export default CreateCharacterSheet;