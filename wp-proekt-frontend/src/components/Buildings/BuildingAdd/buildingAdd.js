import React from 'react';
import {useHistory} from 'react-router-dom';

const BuildingAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newBuilding = {
            name: e.target.name.value,
            description: e.target.description.value
        }
        props.onNewBuildingAdded(newBuilding);
        history.push("/rooms");
    }

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
                                            <input name={"name"} type="text"
                                                   className="form-control"
                                                   title="Име"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold text-right">Опис:</div>
                                <div className={"col-md-6"}>
                                    <div className="row">
                                        <div className="col-md-5 text-left">
                                            <textarea name={"description"}
                                                      className="form-control"
                                                      title="Опис"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 text-right mt-5">
                                <button type="submit" className="btn btn-primary" title="Додади">
                                    Додади
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

export default BuildingAdd;
