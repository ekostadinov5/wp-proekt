import React, {Component} from 'react';
//import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'

import * as consultationsRepository  from '../../repository/consultationsRepository'

import Header from '../Header/header';
import Consultations from '../Consultations/consultations'
import Rooms from '../Rooms/rooms';
import ProfessorConsultations from '../ProfessorConsultations/professorConsultations'
import Footer from '../Footer/footer'

class App extends Component {

    getConsultationsByProfessor = () => {
        return consultationsRepository.getConsultations();
    }

    render() {

        const routing = () => {
            return (
                <Router>
                    <Header />
                    <div role="main" className="mt-3">
                        <div className="container">
                            <Route path={"/consultations"} exact render={()=>
                                <Consultations consultations={this.getConsultationsByProfessor()} />}>
                            </Route>
                            <Route path={"/rooms"} exact render={()=>
                                <Rooms />}>
                            </Route>
                            <Route path={"/consultations/professor"} exact render={()=>
                                <ProfessorConsultations />}>
                            </Route>
                            <Redirect to={"/consultations"} />
                        </div>
                    </div>
                    <Footer />
                </Router>
            );
        }

        return (
            <div className="App">
                {routing()}
            </div>
        );
    }
}

export default App;
