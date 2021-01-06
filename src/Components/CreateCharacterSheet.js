import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
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

    async function clickHandler() {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const user_method = 'get';
        const user_url = `api/user`;
        const user_data = {};
        let userInfo = await axiosHelper(user_method, user_url, headers, getUserInfo, user_data, failure)
        const method = 'post';
        const url = `create_sheet`;
        const data = { id: userInfo.data.id, character_name: characterName, player_name: playerName, class: classs, level, size, alignment, race: characterRace, str, dex, con, int, wil: wis, cha, athletics, acrobatics, sleight, stealth, arcana, hisstory, nature, religion, animalHandling, insight, medicine, perception, deception, intimidation, performance, persuasion, survival, investigation };
        axiosHelper(method, url, headers, success, data, failure);
        history.push("/");
    }

    function getUserInfo(res) {
        return res;
    }
    function success(res) {
    }
    function failure(res) {
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

                <button onClick={clickHandler} className="btn btn-primary">Submit</button>

            </div>

        </div>
    )
}

export default CreateCharacterSheet;