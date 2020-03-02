import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const BuildingAdd = (props) => {

    const [nameErrorMsg, setNameErrorMsg] = useState('');

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
        const newBuilding = {
            name: e.target.name.value,
            description: e.target.description.value
        };
        props.onNewBuildingAdded(newBuilding);
        history.push("/rooms");
    };

    const onBackClick = () => {
        history.push("/rooms");
    };

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
                                       name={"name"}
                                       type="text"
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
                    <button type="submit" className="btn btn-success" title="Додади">
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

export default BuildingAdd;
