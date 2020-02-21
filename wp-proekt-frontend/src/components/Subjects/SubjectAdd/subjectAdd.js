import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const SubjectAdd = (props) => {

    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [shortNameErrorMsg, setShortNameErrorMsg] = useState('');

    const history = useHistory();

    const validate = (e) => {
        let result = true;
        if(e.target.name.value === '') {
            setNameErrorMsg('Ова поле е задолжително');
            result = false;
        }
        if(e.target.shortName.value === '') {
            setShortNameErrorMsg('Ова поле е задолжително');
            result = false;
        }
        return result;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(!validate(e)) {
            return;
        }
        const newSubject = {
            name: e.target.name.value,
            shortName: e.target.shortName.value
        };
        props.onNewSubjectAdded(newSubject);
        history.push("/subjects");
    };

    const onBackClick = () => {
        history.push("/subjects");
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
                <div className="row form-group mt-3 mb-0">
                    <div className="col-md-4 font-weight-bold text-right">Кратенка:</div>
                    <div className={"col-lg-6 col-md-8"}>
                        <div className="row">
                            <div className="col-md-8 text-left">
                                <input onChange={() => setShortNameErrorMsg('')}
                                       name={"shortName"}
                                       type="text"
                                       className="form-control"
                                       title="Кратенка"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 text-right'>
                        <small className='text-danger'>
                            {shortNameErrorMsg}
                        </small>
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

export default SubjectAdd;
