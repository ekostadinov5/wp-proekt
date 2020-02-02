import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import BuildingService from "../../../repository/axiosBuildingsRepository";

const BuildingEdit = (props) => {

    const [building, setBuilding] = useState({id: '', name: '', description: ''});

    const {buildingId} = useParams();

    useEffect(() => {
        BuildingService.fetchById(buildingId).then((promise) => {
            setBuilding({
                id: promise.data.id,
                name: promise.data.name,
                description: promise.data.description
            });
        });
    }, []);

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onBuildingEdited({
            id: building.id,
            name: building.name,
            description: building.description
        });
        history.push("/rooms");
    };
    
    const onBackClick = () => {
        history.push("/rooms");
    }

    const handleRoomOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setBuilding({...building, [paramName]:paramValue});
    };

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
                                                   value={building.name}/>
                                        </div>
                                    </div>
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
                                                      value={building.description}/>
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

export default BuildingEdit;
