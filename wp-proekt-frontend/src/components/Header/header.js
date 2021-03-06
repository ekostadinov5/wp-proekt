import React, {useState} from 'react';
import {Link} from "react-router-dom";

import AppContext from '../../context/AppContext';
import LocalStorageService from '../../services/localStorageService';

const Header = (props) => {

    const [lastClickedLink, setLastClickedLink] = useState(0);

    const linkChange = (e) => {
        let clicked = e.target.parentElement;
        if(clicked.id === 'termsMenuLink') {
            props.loadTerms();
            setLastClickedLink(0);
        }
        if(clicked.id === 'roomsMenuLink') {
            props.loadRooms();
            setLastClickedLink(1);
        }
        if(clicked.id === 'subjectsMenuLink') {
            props.loadSubjects();
            setLastClickedLink(2);
        }
        if(clicked.id === 'myTermsMenuLink') {
            props.loadMyTerms();
        }
        clicked.parentElement.childNodes.forEach(child => child.classList.remove("active"));
        clicked.classList.add("active");
    };

    const onSearch = (e) => {
        e.preventDefault();
        if(lastClickedLink === 0) {
            props.onSearch.searchProfessors(e.target.searchTerm.value);
        } else if(lastClickedLink === 1) {
            props.onSearch.searchRooms(e.target.searchTerm.value);
        } else if(lastClickedLink === 2) {
            props.onSearch.searchSubjects(e.target.searchTerm.value);
        }
    };

    const emptySearch = (e) => {
        if(e.target.value === '') {
            if(lastClickedLink === 0) {
                props.loadTerms();
            } else if(lastClickedLink === 1) {
                props.loadRooms();
            } else if(lastClickedLink === 2) {
                props.loadSubjects();
            }
        }
    };

    const logOut = () => {
        LocalStorageService.clearToken();
        LocalStorageService.clearRole();
        LocalStorageService.clearIdentifier();
        window.location.href = "/";
    };

    const menuItems = () => {
        return (
            <AppContext.Consumer>
                {context => (
                    <ul id={"menu"} className="navbar-nav mr-auto">
                        {(() => {
                            if(LocalStorageService.getRole() !== 'student') {
                                return (
                                    <li id={"termsMenuLink"} className="nav-item active">
                                        <Link onClick={linkChange} className="nav-link" to={"/consultations"}>Термини</Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li id={"termsMenuLink"} className="nav-item active">
                                        <Link onClick={linkChange} className="nav-link" to={"/following"}>Термини</Link>
                                    </li>
                                );
                            }
                        })()}
                        <li id={"roomsMenuLink"} className="nav-item">
                            <Link onClick={linkChange} className="nav-link" to={"/rooms"}>Простории</Link>
                        </li>
                        {(() => {
                            if(context.role === 'professor') {
                                return (
                                    <li id={"myTermsMenuLink"} className="nav-item">
                                        <Link onClick={linkChange} className="nav-link" to={"/professor"}>Мои термини</Link>
                                    </li>
                                );
                            }
                            if(context.role === 'admin') {
                                return (
                                    <li id={"subjectsMenuLink"} className="nav-item">
                                        <Link onClick={linkChange} className="nav-link" to={"/subjects"}>Предмети</Link>
                                    </li>
                                );
                            }
                        })()}
                    </ul>
                )}
            </AppContext.Consumer>
        );
    };

    const searchForm = () => {
        return (
            <form onSubmit={onSearch} className="nav-item form-inline mt-2 mx-3">
                <div className={"form-group m-auto"}>
                    <input ref={element => (element || {}).onsearch=emptySearch}
                           id={"searchTerm"} name={"searchTerm"} className="form-control my-2 mr-2" type="search"
                           placeholder="Пребарај..." aria-label="Search"/>
                    <button className="btn btn-outline-success my-2" type="submit">Пребарај</button>
                </div>
            </form>
        );
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed bg-dark">
                <span className="btn navbar-brand">Консултации</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {menuItems()}
                    {searchForm()}
                    <AppContext.Consumer>
                        {context => (
                            <>
                                {(() => {
                                    if(context.role === 'admin' ||context.role === 'professor' || context.role === 'student') {
                                        return (
                                            <button onClick={logOut}
                                                    className={"nav-item btn btn-outline-danger mt-2"}
                                            >
                                                Одјави се
                                            </button>
                                        );
                                    } else {
                                        return (
                                            <Link onClick={() => {
                                                document.getElementById("menu").childNodes
                                                    .forEach(c => c.classList.remove("active"))
                                            }}
                                                  className="nav-item btn btn-outline-info mt-2" to={"/login"}>
                                                Најава
                                            </Link>
                                        );
                                    }
                                })()}
                            </>
                        )}
                    </AppContext.Consumer>
                </div>
            </nav>
        </header>
    );
};

export default Header;
