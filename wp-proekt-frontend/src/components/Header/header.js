import React from 'react';
import {Link} from "react-router-dom";

const header = () => {
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
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/consultations"}>Термини</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/rooms"}>Простории</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/consultations/professor"}>Мои термини</Link>
                        </li>
                    </ul>
                    <form className="nav-item form-inline mt-2">
                        <div className={"form-group m-auto"}>
                            <input className="form-control my-2 mr-2" type="text" placeholder="Пребарај..."
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success my-2" type="submit">Пребарај</button>
                        </div>
                    </form>
                    <Link className="nav-item btn btn-outline-info mt-2 ml-3" to={"/login"}>Најава</Link>
                </div>
            </nav>
        </header>
    );
}

export default header;