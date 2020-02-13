import React, {Component} from 'react';
//import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";

import AppContext from '../../context/AppContext';
import AppProvider from '../../context/AppProvider';

//import * as consultationsRepository  from '../../repository/consultationsRepository';
import ProfessorsService from '../../repository/axiosProfessorsRepository';
import RoomsService from '../../repository/axiosRoomsRepository';
import BuildingsService from "../../repository/axiosBuildingsRepository";
import StudentsService from "../../repository/axiosStudentsRepository";
import ConsultationsService from "../../repository/axiosConsultationsRepository";

import Header from '../Header/header';
import Footer from '../Footer/footer';

import ConsultationsAll from '../Consultations/ConsultationsByProfessors/AllProfessors/consultationsAll';
import ConsultationsFollowing from '../Consultations/ConsultationsByProfessors/FollowingProfessors/consultationsFollowing';

import Rooms from '../Rooms/RoomsByBuilding/rooms';

import RoomAdd from '../Rooms/RoomAdd/roomAdd';
import RoomEdit from '../Rooms/RoomEdit/roomEdit';

import BuildingAdd from '../Buildings/BuildingAdd/buildingAdd';
import BuildingEdit from '../Buildings/BuildingEdit/buildingEdit';

import ProfessorConsultations from '../ProfessorConsultations/ProfessorConsultationsList/professorConsultations';

import ConsultationAdd from '../Consultations/ConsultationAdd/consultationAdd';
import ConsultationEdit from '../Consultations/ConsultationEdit/consultationEdit';

import Login from '../Login/login';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showErrorModal: false,
            errorMessage: '',
            
            professors: [],
            page: 0,
            pageSize: 18, // 18 ili 24
            totalPages: 0,
            allProfessors: [],
            
            buildings: [],
            
            rooms: [],
            
            student: null,
            studentSlotIds: [],
            studentFollowingIds: [],

            professor: null,
        }
    }

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

    StudentsApi = {
        loadStudent: () => {
            StudentsService.fetchByIndex(170005).then((promise) => {
                this.setState({
                    student: {
                        index: promise.data.index,
                        firstName: promise.data.firstName,
                        lastName: promise.data.lastName
                    },
                    studentSlotIds: promise.data.slots.map(s => s.consultationSlot.id),
                    studentFollowingIds: promise.data.following.map(p => p.id)
                });
            });
        },
        addStudentToSlot: (slotId, index, subjectId, note) => {
            StudentsService.addToSlot(slotId, index, subjectId, note).then(() => {
                this.setState((prevState) => {
                    const newStudentSlotIdsRef = [...prevState.studentSlotIds, slotId];
                    return {
                        studentSlotIds: newStudentSlotIdsRef
                    };
                });
            }).catch(error => {
                if(error.response.status === 403) {
                    this.handleShowErrorModal('Консултациите се моментално во тек!');
                }
            });
        },
        removeStudentFromSlot: (slotId, index) => {
            StudentsService.removeFromSlot(slotId, index).then(() => {
                this.setState((prevState) => {
                    const newStudentSlotIdsRef = prevState.studentSlotIds.filter(id => id !== slotId);
                    return {
                        studentSlotIds: newStudentSlotIdsRef
                    };
                });
            }).catch(error => {
                if(error.response.status === 403) {
                    this.handleShowErrorModal('Консултациите се моментално во тек!');
                }
            });
        },
        followProfessor: (index, professorId) => {
            StudentsService.followProfessor(index, professorId).then(() => {
                this.setState((prevState) => {
                    const newStudentFollowingIdsRef = [...prevState.studentFollowingIds, professorId];
                    return {
                        studentFollowingIds: newStudentFollowingIdsRef
                    }
                });
            });
        },
        unfollowProfessor: (index, professorId) => {
            StudentsService.unfollowProfessor(index, professorId).then(() => {
                this.setState((prevState) => {
                    const newStudentFollowingIdsRef = prevState.studentFollowingIds.filter(id => id !== professorId);
                    return {
                        studentFollowingIds: newStudentFollowingIdsRef
                    }
                });
            });
        }
    };

    ProfessorsApi = {
        loadProfessors: (page = 0) => {
            ProfessorsService.fetchProfessorsPaged(page, this.state.pageSize).then((promise) => {
                this.setState({
                    professors: promise.data.content,
                    page: promise.data.number,
                    pageSize: promise.data.size,
                    totalPages: promise.data.totalPages
                });
            });
            ProfessorsService.fetchProfessors().then((promise) => {
                this.setState({
                    allProfessors: promise.data.content
                });
            });
        },
        loadProfessor: () => {
            ProfessorsService.fetchById("kostadin.mishev").then((promise) => {
                this.setState({
                    professor: promise.data
                });
            });
        }
    };

    ConsultationsApi = {
        createConsultationSlot: (newSlot) => {
            ConsultationsService.addConsultationSlot(newSlot).then(() => {
                this.ProfessorsApi.loadProfessor();
            });
        },
        updateConsultationSlot: (editedSlot) => {
            ConsultationsService.updateConsultationSlot(editedSlot).then(() => {
                this.ProfessorsApi.loadProfessor();
            });
        },
        deleteConsultationSlot: (slotId) => {
            ConsultationsService.deleteConsultationSlot(slotId).then(() => {
                this.ProfessorsApi.loadProfessor();
            });
        }
    };

    SearchApi = {
        searchProfessors: (searchTerm) => {
            ProfessorsService.searchProfessors(searchTerm).then((promise) => {
                this.setState({
                    professors: promise.data,
                    page: 0,
                    pageSize: 18, // 18 ili 24
                    totalPages: 0,
                    allProfessors: promise.data
                });
            });
        },
        searchRooms: (searchTerm) => {
            RoomsService.searchRooms(searchTerm).then((promise) => {
                this.setState({
                    rooms: promise.data,
                });
            });
        }
    };

    handleCloseErrorModal = () => this.setState({showErrorModal: false, errorMessage: ''});
    handleShowErrorModal = (message) => this.setState({showErrorModal: true, errorMessage: message});

    componentDidMount() {
        this.ProfessorsApi.loadProfessors();
        this.BuildingsApi.loadBuildings();
        this.RoomsApi.loadRooms();
        this.StudentsApi.loadStudent();
        this.ProfessorsApi.loadProfessor();
    }

    render() {

        const routing = () => {

            const adminRoutes = () => {
                return (
                    <div className="container">
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
                    </div>
                );
            };

            const professorRoutes = () => {
                return (
                    <div className="container">
                        <Route path={"/professor"} exact render={()=>
                            <ProfessorConsultations professor={this.state.professor}
                                                    onConsultationSlotDeleted={this.ConsultationsApi.deleteConsultationSlot} />}>
                        </Route>
                        <Route path={"/consultations/add"} exact render={() =>
                            <ConsultationAdd buildings={this.state.buildings}
                                             rooms={this.state.rooms}
                                             professor={this.state.professor}
                                             onConsultationSlotAdded={this.ConsultationsApi.createConsultationSlot} />}>
                        </Route>
                        <Route path={"/consultations/:slotId/edit"} exact render={() =>
                            <ConsultationEdit buildings={this.state.buildings}
                                              rooms={this.state.rooms}
                                              professor={this.state.professor}
                                              onConsultationSlotEdited={this.ConsultationsApi.updateConsultationSlot} />}>
                        </Route>
                    </div>
                );
            };

            const studentRoutes = () => {
                return (
                    <div className="container">
                        <Route path={"/following"} exact render={()=>
                            <ConsultationsFollowing professors={this.state.allProfessors}
                                                    student={this.state.student}
                                                    studentSlotIds={this.state.studentSlotIds}
                                                    onStudentAddedToSlot={this.StudentsApi.addStudentToSlot}
                                                    onStudentRemovedFromSlot={this.StudentsApi.removeStudentFromSlot}
                                                    studentFollowingIds={this.state.studentFollowingIds}
                                                    followProfessor={this.StudentsApi.followProfessor}
                                                    unfollowProfessor={this.StudentsApi.unfollowProfessor} />}>
                        </Route>
                    </div>
                );
            };

            const routes = () => {
                return (
                    <div className="container">
                        <Route path={"/consultations"} exact render={()=>
                            <ConsultationsAll consultations={this.state.professors}
                                              onPageClick={this.ProfessorsApi.loadProfessors}
                                              page={this.state.page} totalPages={this.state.totalPages}
                                              student={this.state.student} studentSlotIds={this.state.studentSlotIds}
                                              onStudentAddedToSlot={this.StudentsApi.addStudentToSlot}
                                              onStudentRemovedFromSlot={this.StudentsApi.removeStudentFromSlot}
                                              studentFollowingIds={this.state.studentFollowingIds}
                                              followProfessor={this.StudentsApi.followProfessor}
                                              unfollowProfessor={this.StudentsApi.unfollowProfessor} />}>
                        </Route>

                        <Route path={"/rooms"} exact render={()=>
                            <Rooms buildings={this.state.buildings} rooms={this.state.rooms}
                                   onBuildingDelete={this.BuildingsApi.deleteBuilding}
                                   onRoomDelete={this.RoomsApi.deleteRoom} />}>
                        </Route>

                        <Route path={"/login"} exact render={() =>
                            <Login />}>
                        </Route>

                        <Redirect to={"/consultations"} />
                    </div>
                );
            };

            return (
                <AppContext.Consumer>
                    {context => (
                        <Router>
                            <Header onSearch={this.SearchApi} onTermsLinkClicked={this.ProfessorsApi.loadProfessors}
                                    onRoomsLinkClicked={this.RoomsApi.loadRooms} />
                            <div role="main" className="mt-3">
                                {routes()}
                                {(() => {
                                    if(context.role === 'admin') {
                                        return adminRoutes();
                                    } else if(context.role === 'professor') {
                                        return professorRoutes();
                                    } else if(context.role === 'student') {
                                        return studentRoutes();
                                    }
                                })()}
                            </div>
                            <Footer />
                        </Router>
                    )}
                </AppContext.Consumer>
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
            <AppProvider>
                <div className="App">
                    {routing()}
                    {errorModal()}
                </div>
            </AppProvider>
        );
    }
}

export default App;
