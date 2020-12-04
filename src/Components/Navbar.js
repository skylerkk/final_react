import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../Utilities/AppContext';
import { useToken } from '../Utilities/TokenContext';
import {useHistory} from 'react-router-dom';

function Navbar(){
    
    const {pages} = useContext(AppContext);
    const { token , logOut } = useToken();
    const { pathname } = useLocation();
    const history = useHistory();

    function clickHandler(){
        logOut();
        history.push('/');
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark brand">
            <div className = "container">
                <a className="navbar-brand">TTRPG Character Sheet Creator</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                 </button>
                 <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {
                            pages.filter((item, index) => {
                                if (item.url == '/'){
                                    return item;
                                }
                                if (token.length > 0){
                                    if(item.url === '/logout'){
                                        return item;
                                    }
                                    if(item.url === '/profile'){
                                        return item;
                                    }
                                }
                                else {
                                    if(item.url !== '/logout' && item.url !== '/profile'){
                                        return item;
                                    }
                                }
                            }).map((item, index) => {
                                return (
                                    <li className="nav-item" key = {index}>
                                        {item.url === '/logout' ?
                                            <a href="#" className = "nav-link" onClick={clickHandler}> LogOut </a> :
                                        <Link 
                                            to={item.url}
                                            className={"nav-link " + (pathname === item.url ? "active" : "")}>
                                            {item.readableName}
                                        </Link>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                 </div>
            </div>
        </nav>
    );
}

export default Navbar;