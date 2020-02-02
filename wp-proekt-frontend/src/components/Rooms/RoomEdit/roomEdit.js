import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import BuildingService from "../../../repository/axiosBuildingsRepository";
import RoomService from '../../../repository/axiosRoomsRepository';

const RoomEdit = (props) => {

    const [buildings, setBuildings] = useState([]);
    const [room, setRoom] = useState({name: '', buildingName: '', description: ''});

    const {roomName} = useParams();

    useEffect(() => {
        BuildingService.fetchBuildingsOrdered().then((promise) => {
            setBuildings(promise.data);
        });
        RoomService.fetchByName(roomName).then((promise) => {
            setRoom({
                name: promise.data.name,
                buildingName: promise.data.building.name,
                description: promise.data.description
            });
        });
    }, []);

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onRoomEdited({
            name: roomName,
            buildingName: room.buildingName,
            description: room.description
        });
        history.push("/rooms");
    }

    const handleRoomOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setRoom({...room, [paramName]:paramValue});
    }

    const options = buildings.map(b => <option key={b.name} value={b.name}>{b.name}</option>);

    return (
        <div>
            <div className="card-body">
                <div className="card-text">
                    <div className="consultations">
                        <hr/>
                        <form onSubmit={onFormSubmit} className={"mt-5"}>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold text-right">Име:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-5 text-right">
                                            <input disabled={true}
                                                   name={"name"}
                                                   type="text"
                                                   className="form-control"
                                                   title="Име"
                                                   value={roomName}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold text-right">Група на простории:</div>
                                <div className="col-md-3">
                                    <select onChange={handleRoomOnChange}
                                            name={"buildingName"}
                                            className="form-control"
                                            value={room.buildingName}>
                                        {options}
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold text-right">Опис:</div>
                                <div className={"col-md-6"}>
                                    <div className="row">
                                        <div className="col-md-5 text-left">
                                            <textarea onChange={handleRoomOnChange}
                                                      name={"description"}
                                                      className="form-control"
                                                      title="Опис"
                                                      value={room.description}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 text-right mt-5">
                                <button type="submit" className="btn btn-primary" title="Додади">
                                    Уреди
                                </button>
                            </div>
                        </form>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomEdit;
