import React, {Component} from 'react';
//import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";

//import * as consultationsRepository  from '../../repository/consultationsRepository';
import ProfessorsService from '../../repository/axiosProfessorsRepository';
import RoomsService from '../../repository/axiosRoomsRepository';
import BuildingsService from "../../repository/axiosBuildingsRepository";

import Header from '../Header/header';
import Footer from '../Footer/footer';

import Consultations from '../Consultations/ConsultationsByProfessor/consultations';

import Rooms from '../Rooms/RoomsByBuilding/rooms';

import RoomAdd from '../Rooms/RoomAdd/roomAdd';
import RoomEdit from '../Rooms/RoomEdit/roomEdit';

import BuildingAdd from '../Buildings/BuildingAdd/buildingAdd';
import BuildingEdit from '../Buildings/BuildingEdit/buildingEdit';

import ProfessorConsultations from '../ProfessorConsultations/professorConsultations';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showErrorModal: false,
            errorMessage: '',
            professors: [],
            page: 0,
            pageSize: 2,
            totalPages: 0,
            buildings: [],
            rooms: []
        }
    }

    handleCloseErrorModal = () => this.setState({showErrorModal: false, errorMessage: ''});
    handleShowErrorModal = (message) => this.setState({showErrorModal: true, errorMessage: message});

    BuildingsApi = {
        loadBuildings: () => {
            BuildingsService.fetchBuildings().then((promise) => {
                this.setState({
                    buildings: promise.data
                });
            });
        },
        createBuilding: (newBuilding) => {
            BuildingsService.addBuilding(newBuilding).then((promise) => {
                const newBuilding = promise.data;
                this.setState((prevState) => {
                    const newBuildingsRef = [...prevState.buildings, newBuilding];
                    return {
                        buildings: newBuildingsRef
                    }
                });
            }).catch(error => {
                if(error.response.status === 409) {
                    this.handleShowErrorModal(`Веќе постои група на простории со име ${newBuilding.name}!`);
                }
            });
        },
        updateBuilding: (editedBuilding) => {
            BuildingsService.updateBuilding(editedBuilding).then((promise) => {
                const newBuilding = promise.data;
                this.setState((prevState) => {
                    const newBuildingsRef = prevState.buildings
                        .map(b => (newBuilding.id !== b.id) ? b : newBuilding);
                    return {
                        buildings: newBuildingsRef
                    }
                })
            }).catch(error => {
                if(error.response.status === 409) {
                    this.handleShowErrorModal(`Веќе постои група на простории со име ${editedBuilding.name}!`);
                }
            });
        },
        deleteBuilding: (buildingId) => {
            BuildingsService.deleteBuilding(buildingId).then(() => {
                this.setState((prevState) => {
                    const newBuildingsRef = prevState.buildings.filter(b => buildingId !== b.id);
                    const newRoomsRef = prevState.rooms.filter(r => buildingId !== r.building.id);
                    return {
                        buildings: newBuildingsRef,
                        rooms: newRoomsRef
                    }
                });
            });
        }
    };

    RoomsApi = {
        loadRooms: () => {
            RoomsService.fetchRooms().then((promise) => {
                this.setState({
                    rooms: promise.data
                });
            });
        },
        createRoom: (newRoom) => {
            RoomsService.addRoom(newRoom).then((promise) => {
                const newRoom = promise.data;
                this.setState((prevState) => {
                    const newRoomsRef = [...prevState.rooms, newRoom];
                    return {
                        rooms: newRoomsRef
                    }
                });
            }).catch(error => {
                if(error.response.status === 409) {
                    this.handleShowErrorModal(`Веќе постои просторија со име ${newRoom.name} во избраната група на простории!`);
                }
            });
        },
        updateRoom: (editedRoom) => {
            RoomsService.updateRoom(editedRoom).then((promise) => {
                const newRoom = promise.data;
                this.setState((prevState) => {
                    const newRoomsRef = prevState.rooms.map(r => (newRoom.id !== r.id) ? r : newRoom);
                    return {
                        rooms: newRoomsRef
                    }
                });
            }).catch(error => {
                if(error.response.status === 409) {
                    this.handleShowErrorModal(`Веќе постои просторија со име ${editedRoom.name} во избраната група на простории!`);
                }
            });
        },
        deleteRoom: (roomId) => {
            RoomsService.deleteRoom(roomId).then(() => {
                this.setState((prevState) => {
                    const newRoomsRef = prevState.rooms.filter(r => roomId !== r.id);
                    return {
                        rooms: newRoomsRef
                    }
                });
            });
        }
    };
    
    loadProfessors = (page = 0) => {
        ProfessorsService.fetchProfessorsPaged(page, this.state.pageSize).then((promise) => {
            this.setState({
                professors: promise.data.content,
                page: promise.data.number,
                pageSize: promise.data.size,
                totalPages: promise.data.totalPages
            });
        });
    };

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
    };

    componentDidMount() {
        this.loadProfessors();
        this.BuildingsApi.loadBuildings();
        this.RoomsApi.loadRooms();
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
                                <Rooms buildings={this.state.buildings} rooms={this.state.rooms}
                                       onBuildingDelete={this.BuildingsApi.deleteBuilding} 
                                       onRoomDelete={this.RoomsApi.deleteRoom} />}>
                            </Route>

                            <Route path={"/rooms/add"} exact render={()=>
                                <RoomAdd onNewRoomAdded={this.RoomsApi.createRoom} />}>
                            </Route>
                            <Route path={"/rooms/:roomId/edit"} exact render={()=>
                                <RoomEdit onRoomEdited={this.RoomsApi.updateRoom} />}>
                            </Route>

                            <Route path={"/buildings/add"} exact render={()=>
                                <BuildingAdd onNewBuildingAdded={this.BuildingsApi.createBuilding} />}>
                            </Route>
                            <Route path={"/buildings/:buildingId/edit"} exact render={()=>
                                <BuildingEdit onBuildingEdited={this.BuildingsApi.updateBuilding} />}>
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
        };

        const errorModal = () => {
            return (
                <Modal show={this.state.showErrorModal} onHide={this.handleCloseErrorModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Грешка!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.errorMessage}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleCloseErrorModal}>
                            Во ред
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        };

        return (
            <div className="App">
                {routing()}
                {errorModal()}
            </div>
        );
    }
}

export default App;
