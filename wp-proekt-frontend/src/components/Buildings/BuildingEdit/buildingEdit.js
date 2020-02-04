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
    }, [buildingId]);

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

    const handleBuildingOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setBuilding({...building, [paramName]:paramValue});
    };

    return (
        <div>
            <hr/>
            <form onSubmit={onFormSubmit} className={"mt-5"}>
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold text-right">Име:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <div className="col-md-8 text-right">
                                <input onChange={handleBuildingOnChange}
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
                    <div className="col-md-4 font-weight-bold text-right">Опис:</div>
                    <div className={"col-lg-6 col-md-8"}>
                        <div className="row">
                            <div className="col-md-8 text-left">
                                            <textarea onChange={handleBuildingOnChange}
                                                      name={"description"}
                                                      className="form-control"
                                                      title="Опис"
                                                      value={building.description}
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

export default BuildingEdit;
