import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import BuildingService from "../../../repository/axiosBuildingsRepository";
import RoomService from '../../../repository/axiosRoomsRepository';

const RoomEdit = (props) => {

    const [buildings, setBuildings] = useState([]);
    const [room, setRoom] = useState({id: '', name: '', buildingId: '', description: ''});

    const {roomId} = useParams();

    useEffect(() => {
        BuildingService.fetchBuildingsOrdered().then((promise) => {
            setBuildings(promise.data);
        });
        RoomService.fetchById(roomId).then((promise) => {
            setRoom({
                id: promise.data.id,
                name: promise.data.name,
                buildingId: promise.data.building.id,
                description: promise.data.description
            });
        });
    }, []);

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onRoomEdited({
            id: room.id,
            name: room.name,
            buildingId: room.buildingId,
            description: room.description
        });
        history.push("/rooms");
    };

    const onBackClick = () => {
        history.push("/rooms");
    }

    const handleRoomOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setRoom({...room, [paramName]:paramValue});
    };

    const options = buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>);

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
                                            <input onChange={handleRoomOnChange}
                                                   name={"name"}
                                                   type="text"
                                                   className="form-control"
                                                   title="Име"
                                                   value={room.name}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold text-right">Група на простории:</div>
                                <div className="col-md-3">
                                    <select onChange={handleRoomOnChange}
                                            name={"buildingId"}
                                            className="form-control"
                                            value={room.buildingId}>
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
                                                      value={room.description}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 text-right mt-5">
                                <button type="submit" className="btn btn-primary" title="Додади">
                                    Уреди
                                </button>
                                <button onClick={onBackClick} type="submit"
                                        className="btn btn-secondary ml-2" title="Назад">
                                    Назад
                                </button>
                            </div>
                        </form>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomEdit;
