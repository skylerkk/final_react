import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
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
    const [characterName, setCharacterName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [classs, setClasss] = useState('');
    const [size, setSize] = useState('');
    const [alignment, setAlignment] = useState('');
    const [characterRace, setCharacterRace] = useState('');
    const [level, setLevel] = useState();
    const [str, setStr] = useState('');
    const [dex, setDex] = useState('');
    const [con, setCon] = useState('');
    const [int, setInt] = useState('');
    const [wis, setWis] = useState('');
    const [cha, setCha] = useState('');
    const [athletics, setAthletics] = useState('');
    const [acrobatics, setAcrobatics] = useState('');
    const [sleight, setSleight] = useState('');
    const [stealth, setStealth] = useState('');
    const [arcana, setArcana] = useState('');
    const [hisstory, setHisstory] = useState('');
    const [nature, setNature] = useState('');
    const [religion, setReligion] = useState('');
    const [animalHandling, setAnimalHandling] = useState('');
    const [insight, setInsight] = useState('');
    const [medicine, setMedicine] = useState('');
    const [perception, setPerception] = useState('');
    const [deception, setDeception] = useState('');
    const [intimidation, setIntimidation] = useState('');
    const [performance, setPerformance] = useState('');
    const [persuasion, setPersuasion] = useState('');
    const [survival, setSurvival] = useState('');
    const [investigation, setInvestigation] = useState('');
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

    function sheetHelper(res) {
    }

    function failure(err) {
        console.log(err);
    }

    async function getSheet() {
        const tokenUrl = 'api/user';
        const sheetUrl = `character/${id}`;
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
        const deleteUrl = 'delete_sheet';
        const data = {
            id: sheetId
        };
        axiosHelper(deleteMethod, deleteUrl, header, deleteHelper, data, failure);
    }

    async function updateSheet() {
        const method = 'post';
        const infoUrl = 'update_sheet_info';
        const statsUrl = 'update_sheet_stats';
        const skillUrl = 'update_sheet_skills';
        const statData = {
            id: sheetId, str, dex, con, wil: wis, cha, int
        };
        const infoData = {
            id: sheetId, player_name: playerName, character_name: characterName, level, race: characterRace, class: classs, size, alignment
        };
        const skillData = {
            id: sheetId, athletics, acrobatics, sleight, stealth, arcana, hisstory, nature, religion, animalHandling, insight, medicine, perception, deception, intimidation, performance, persuasion, survival, investigation
        }
        await axiosHelper(method, infoUrl, header, sheetHelper, infoData, failure);
        await axiosHelper(method, statsUrl, header, sheetHelper, statData, failure);
        await axiosHelper(method, skillUrl, header, sheetHelper, skillData, failure);
        getSheet();
    }

    function changeEdit() {
        if (editMode === false) {
            setCharacterName(sheetInfo.info[0].character_name);
            setPlayerName(sheetInfo.info[0].player_name);
            setClasss(sheetInfo.info[0].class);
            setSize(sheetInfo.info[0].size);
            setAlignment(sheetInfo.info[0].alignment);
            setCharacterRace(sheetInfo.info[0].race);
            setLevel(sheetInfo.info[0].level);
            setStr(sheetInfo.stats[0].str);
            setDex(sheetInfo.stats[0].dex);
            setCon(sheetInfo.stats[0].con);
            setInt(sheetInfo.stats[0].int);
            setWis(sheetInfo.stats[0].wil);
            setCha(sheetInfo.stats[0].cha);
        }
        else {
            updateSheet();
        }
        setEditMode(!editMode);
    }

    useEffect(() => {
        getSheet();
        if (Object.keys(sheetInfo).length > 0) {
            if (sheetInfo.sheet[0].user_id === userId) {
                setUserSheet(true);
                setSheetId(sheetInfo.sheet[0].id);
            }
        }
    }, [token, userId, editMode]);


    return (
        <div className="container">

            {(Object.keys(sheetInfo).length > 0 && editMode === false) ?

                (sheetInfo.info.length > 0 && sheetInfo.stats.length > 0) ?
                    <div className="row">
                        <h2 className="col-6 mt-5">Character Name: {sheetInfo.info[0].character_name}</h2>
                        <h2 className="col-6 mt-5">Player Name: {sheetInfo.info[0].player_name}</h2>
                        <h5 className="col-3">Class: {sheetInfo.info[0].class}</h5>
                        <h5 className="col-3">Race: {sheetInfo.info[0].race}</h5>
                        <h5 className="col-3">Size: {sheetInfo.info[0].size}</h5>
                        <h5 className="col-3">Alignment: {sheetInfo.info[0].alignment}</h5>
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
                (editMode === true) ?
                    <div className='row'>
                        <h2 className='text-center col-12'>Make changes and click save</h2>
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
                        <div className="form-group col-2">
                            <h5>Athletics:</h5>
                            <input onChange={e => setAthletics(e.target.value)} value={athletics} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Athletics" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Acrobatics:</h5>
                            <input onChange={e => setAcrobatics(e.target.value)} value={acrobatics} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Acrobatics" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Sleight Of Hand:</h5>
                            <input onChange={e => setSleight(e.target.value)} value={sleight} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Sleight Of Hand" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Stealth:</h5>
                            <input onChange={e => setStealth(e.target.value)} value={stealth} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Stealth" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Arcana:</h5>
                            <input onChange={e => setArcana(e.target.value)} value={arcana} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Arcana" />
                        </div>
                        <div className="form-group col-2">
                            <h5>History:</h5>
                            <input onChange={e => setHisstory(e.target.value)} value={hisstory} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="History" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Investigation:</h5>
                            <input onChange={e => setInvestigation(e.target.value)} value={investigation} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Investigaion" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Nature:</h5>
                            <input onChange={e => setNature(e.target.value)} value={nature} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="nature" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Religion:</h5>
                            <input onChange={e => setReligion(e.target.value)} value={religion} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Religion" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Animal Handling:</h5>
                            <input onChange={e => setAnimalHandling(e.target.value)} value={animalHandling} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Animal Handling" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Insight:</h5>
                            <input onChange={e => setInsight(e.target.value)} value={insight} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Insight" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Medicine:</h5>
                            <input onChange={e => setMedicine(e.target.value)} value={medicine} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Medicine" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Perception:</h5>
                            <input onChange={e => setPerception(e.target.value)} value={perception} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Perception" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Survival:</h5>
                            <input onChange={e => setSurvival(e.target.value)} value={survival} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Survival" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Deception:</h5>
                            <input onChange={e => setDeception(e.target.value)} value={deception} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Deception" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Intimidation:</h5>
                            <input onChange={e => setIntimidation(e.target.value)} value={intimidation} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Intimidation" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Performance:</h5>
                            <input onChange={e => setPerformance(e.target.value)} value={performance} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Performance" />
                        </div>
                        <div className="form-group col-2">
                            <h5>Persuasion:</h5>
                            <input onChange={e => setPersuasion(e.target.value)} value={persuasion} type="text" className="form-control" id="InputLevel" aria-describedby="emailHelp" placeholder="Persuasion" />
                        </div>
                        <button onClick={changeEdit}>Save</button>

                    </div> :
                    <div>
                        <h2>Loading or Sheet does not Exist</h2>
                    </div>


            }

            {
                (userSheet && editMode === false) &&
                <div className="pt-3">
                    <div>
                        <button className="btn btn-primary" onClick={changeEdit}>Edit</button>
                    </div>
                    <div className='pt-2'>
                        <button className="btn btn-danger" onClick={() => deleteSheet()}>Delete</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CharacterSheet;