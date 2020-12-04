import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useToken } from '../Utilities/TokenContext';

function Home() {

    const { token } = useToken();
    const history = useHistory();
    const [alert, setAlert] = useState(false);

    function createHandler() {
        if (token.length > 0) {
            history.push('/create_character');
        }
        else {
            setAlert(true);
        }
    }

    return (
        <div className="container text-center">
            <div className="py-3">
                <h1>Welcome to TTRPG Charcter Sheet Creator</h1>
            </div>
            <div className="py-5">
                <button className="btn btn-primary" onClick={createHandler}>Create a Character Sheet</button>
            </div>
            <div>
                {alert && <div className="alert alert-warning alert-dismissible fade show" role="alert" id='alert'>
                    You are not logged in please log in to create a character.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlert(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
            </div>
            <div className="py-5">
                <button className="btn btn-primary" onClick={() => history.push('/characters')}>View a Character Sheets</button>
            </div>
        </div>
    )
}

export default Home;