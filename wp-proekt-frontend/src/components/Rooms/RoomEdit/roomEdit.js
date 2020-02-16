import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import BuildingService from "../../../repository/axiosBuildingsRepository";
import RoomService from '../../../repository/axiosRoomsRepository';

const RoomEdit = (props) => {

    const [buildings, setBuildings] = useState([]);
    const [room, setRoom] = useState({id: '', name: '', buildingId: '', description: ''});
    const [nameErrorMsg, setNameErrorMsg] = useState('');

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
    }, [roomId]);

    const history = useHistory();

    const validate = (e) => {
        if(e.target.name.value === '') {
            setNameErrorMsg('Ова поле е задолжително');
            return false;
        }
        return true;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(!validate(e)) {
            return;
        }
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
    };

    const handleRoomOnChange = (e) => {
        setNameErrorMsg('');
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setRoom({...room, [paramName]: paramValue});
    };

    const options = buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>);

    return (
        <div>
            <hr/>
            <form onSubmit={onFormSubmit} className={"mt-5"}>
                <div className="row form-group mb-0">
                    <div className="col-md-4 font-weight-bold text-right">Име:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <div className="col-md-8 text-right">
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
                <div className='row'>
                    <div className='col-8 text-right'>
                        <small className='text-danger'>
                            {nameErrorMsg}
                        </small>
                    </div>
                </div>
                <div className="row form-group mt-3">
                    <div className="col-md-4 font-weight-bold text-right">Група на простории:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className={"row"}>
                            <div className={"col-md-8"}>
                                <select onChange={handleRoomOnChange}
                                        name={"buildingId"}
                                        className="form-control"
                                        value={room.buildingId} 
                                        title={"Група на простории"}>
                                    {options}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold text-right">Опис:</div>
                    <div className={"col-lg-6 col-md-8"}>
                        <div className="row">
                            <div className="col-md-8 text-left">
                                            <textarea onChange={handleRoomOnChange}
                                                      name={"description"}
                                                      className="form-control"
                                                      title="Опис"
                                                      value={room.description}
                                                      rows={7}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 text-right mt-5">
                    <button type="submit" className="btn btn-primary" title="Уреди">
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
    );
};

export default RoomEdit;
