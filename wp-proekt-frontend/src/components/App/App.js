import React, {Component} from 'react';
//import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

//import * as consultationsRepository  from '../../repository/consultationsRepository';
import ProfessorsService from '../../repository/axiosProfessorsRepository';
import RoomsService from '../../repository/axiosRoomsRepository';

import Header from '../Header/header';
import Consultations from '../Consultations/consultations';
import Rooms from '../Rooms/rooms';
import ProfessorConsultations from '../ProfessorConsultations/professorConsultations';
import Footer from '../Footer/footer';
import BuildingsService from "../../repository/axiosBuildingsRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            professors: [],
            page: 0,
            pageSize: 2,
            totalPages: 0,
            rooms: []
        }
    }

    loadProfessors = (page = 0) => {
        ProfessorsService.fetchProfessorsPaged(page, this.state.pageSize).then((promise) => {
            this.setState({
                professors: promise.data.content,
                page: promise.data.number,
                pageSize: promise.data.size,
                totalPages: promise.data.totalPages
            });
        });
    }

    loadRooms = () => {
        RoomsService.fetchRooms().then((promise) => {
            console.log(promise.data)
            this.setState({
                rooms: promise.data
            });
        });
    }

    searchData = (searchTerm) => {
        ProfessorsService.searchProfessors(searchTerm).then((promise) => {
            this.setState({
                professors: promise.data,
                page: 0,
                pageSize: 2,
                totalPages: 0
            });
        });
        RoomsService.searchRooms(searchTerm).then((promise) => {
            this.setState({
                rooms: promise.data,
            });
        });
    }

    deleteBuilding = (buildingName) => {
        BuildingsService.deleteBuilding(buildingName).then(() => {
            this.setState((prevState) => {
                const newRoomsRef = prevState.rooms.filter(r => buildingName !== r.building.name);
                return {
                    rooms: newRoomsRef
                }
            });
        });
    }

    deleteRoom = (roomName) => {
        RoomsService.deleteRoom(roomName).then(() => {
            this.setState((prevState) => {
                const newRoomsRef = prevState.rooms.filter(r => roomName !== r.name);
                return {
                    rooms: newRoomsRef
                }
            });
        });
    }

    componentDidMount() {
        this.loadProfessors();
        this.loadRooms();
    }

    render() {

        const routing = () => {
            return (
                <Router>
                    <Header onSearch={this.searchData} />
                    <div role="main" className="mt-3">
                        <div className="container">
                            <Route path={"/consultations"} exact render={()=>
                                <Consultations consultations={this.state.professors} onPageClick={this.loadProfessors}
                                               totalPages={this.state.totalPages} />}>
                            </Route>
                            <Route path={"/rooms"} exact render={()=>
                                <Rooms rooms={this.state.rooms} onBuildingDelete={this.deleteBuilding}
                                       onRoomDelete={this.deleteRoom} />}>
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
