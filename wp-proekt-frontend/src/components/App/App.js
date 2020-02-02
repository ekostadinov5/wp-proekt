import React, {Component} from 'react';
//import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

//import * as consultationsRepository  from '../../repository/consultationsRepository';
import ProfessorsService from '../../repository/axiosProfessorsRepository';
import RoomsService from '../../repository/axiosRoomsRepository';
import BuildingsService from "../../repository/axiosBuildingsRepository";

import Header from '../Header/header';
import Footer from '../Footer/footer';
import Consultations from '../Consultations/consultations';
import Rooms from '../Rooms/RoomsByBuilding/rooms';
import RoomAdd from '../Rooms/RoomAdd/roomAdd';
import RoomEdit from '../Rooms/RoomEdit/roomEdit';
import BuildingAdd from '../Buildings/BuildingAdd/buildingAdd';
import BuildingEdit from '../Buildings/BuildingEdit/buildingEdit'
import ProfessorConsultations from '../ProfessorConsultations/professorConsultations';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forceRerender: 0,
            professors: [],
            page: 0,
            pageSize: 2,
            totalPages: 0,
            buildings: [],
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
    
    loadBuildings = () => {
        BuildingsService.fetchBuildings().then((promise) => {
            this.setState({
                buildings: promise.data
            });
        });
    }

    loadRooms = () => {
        RoomsService.fetchRoomsOrdered().then((promise) => {
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

    createBuilding = (newBuilding) => {
        BuildingsService.addBuilding(newBuilding).then((promise) => {
            const newBuilding = promise.data;
            this.setState((prevState) => {
                const newBuildingsRef = [...prevState.buildings, newBuilding];
                return {
                    buildings: newBuildingsRef
                }
            });
        });
    }

    createRoom = (newRoom) => {
        RoomsService.addRoom(newRoom).then((promise) => {
            const newRoom = promise.data;
            this.setState((prevState) => {
                const newRoomsRef = [...prevState.rooms, newRoom];
                return {
                    rooms: newRoomsRef
                }
            });
        });
    }

    updateBuilding = (editedBuilding) => {
        BuildingsService.updateBuilding(editedBuilding).then((promise) => {
            const newBuilding = promise.data;
            this.setState((prevState) => {
                const newBuildingsRef = prevState.buildings
                    .map(b => (newBuilding.name !== b.name) ? b : newBuilding);
                return {
                    buildings: newBuildingsRef
                }
            })
        });
    }

    updateRoom = (editedRoom) => {
        RoomsService.updateRoom(editedRoom).then((promise) => {
            const newRoom = promise.data;
            this.setState((prevState) => {
                const newRoomsRef = prevState.rooms.map(r => (newRoom.name !== r.name) ? r : newRoom);
                return {
                    rooms: newRoomsRef
                }
            });
        });
    }

    componentDidMount() {
        this.loadProfessors();
        this.loadBuildings();
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
                                <Rooms key={this.state.forceRerender}
                                       buildings={this.state.buildings} rooms={this.state.rooms}
                                       onBuildingDelete={this.deleteBuilding} onRoomDelete={this.deleteRoom} />}>
                            </Route>
                            <Route path={"/rooms/add"} exact render={()=>
                                <RoomAdd onNewRoomAdded={this.createRoom} />}>
                            </Route>
                            <Route path={"/rooms/:roomName/edit"} exact render={()=>
                                <RoomEdit onRoomEdited={this.updateRoom} />}>
                            </Route>
                            <Route path={"/consultations/professor"} exact render={()=>
                                <ProfessorConsultations />}>
                            </Route>
                            <Route path={"/buildings/add"} exact render={()=>
                                <BuildingAdd onNewBuildingAdded={this.createBuilding} />}>
                            </Route>
                            <Route path={"/buildings/:buildingName/edit"} exact render={()=>
                                <BuildingEdit onBuildingEdited={this.updateBuilding} />}>
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
