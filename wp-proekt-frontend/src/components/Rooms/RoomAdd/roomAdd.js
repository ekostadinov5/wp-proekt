import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import BuildingService from '../../../repository/axiosBuildingsRepository';

const RoomAdd = (props) => {

    const [buildings, setBuildings] = useState([]);
    const [nameErrorMsg, setNameErrorMsg] = useState('');

    useEffect(() => {
        BuildingService.fetchBuildingsOrdered().then((promise) => {
            setBuildings(promise.data);
        });
    }, []);

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
        const newRoom = {
            name: e.target.name.value,
            buildingId: e.target.buildingId.value,
            description: e.target.description.value
        };
        props.onNewRoomAdded(newRoom);
        history.push("/rooms");
    };

    const onBackClick = () => {
        history.push("/rooms");
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
                                <input onChange={() => setNameErrorMsg('')}
                                       name={"name"} type="text"
                                       className="form-control"
                                       title="Име"/>
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
                                <select name={"buildingId"} className="form-control" title={"Група на простории"}>
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
                                            <textarea name={"description"}
                                                      className="form-control"
                                                      title="Опис"
                                                      rows={7}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 text-right mt-5">
                    <button type="submit" className="btn btn-primary" title="Додади">
                        Додади
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

export default RoomAdd;
