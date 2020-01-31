import React from 'react';
import {Link} from "react-router-dom";

const header = (props) => {

    const linkChange = (e) => {
        let clicked = e.target.parentElement;
        clicked.parentElement.childNodes.forEach(child => child.classList.remove("active"));
        clicked.classList.add("active");
    }

    const menuItems = () => {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link onClick={linkChange} className="nav-link" to={"/consultations"}>Термини</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={linkChange} className="nav-link" to={"/rooms"}>Простории</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={linkChange} className="nav-link" to={"/consultations/professor"}>Мои термини</Link>
                </li>
            </ul>
        );
    }

    const onSearch = (e) => {
        e.preventDefault();
        let searchTerm = e.target.searchTerm.value;
        props.onSearch(e.target.searchTerm.value);
    }

    const searchForm = () => {
        return (
            <form onSubmit={onSearch} className="nav-item form-inline mt-2">
                <div className={"form-group m-auto"}>
                    <input id={"searchTerm"} name={"searchTerm"} className="form-control my-2 mr-2" type="search" placeholder="Пребарај..."
                           aria-label="Search"/>
                    <button className="btn btn-outline-success my-2" type="submit">Пребарај</button>
                </div>
            </form>
        );
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="#">Консултации</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {menuItems()}
                    {searchForm()}
                    <Link className="nav-item btn btn-outline-info mt-2 ml-3" to={"/login"}>Најава</Link>
                </div>
            </nav>
        </header>
    );
}

export default header;
