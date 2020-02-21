import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import SubjectService from "../../../repository/axiosSubjectRepository";

const SubjectEdit = (props) => {

    const [subject, setSubject] = useState({id: '', name: '', shortName: ''});
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [shortNameErrorMsg, setShortNameErrorMsg] = useState('');

    const {subjectId} = useParams();

    useEffect(() => {
        SubjectService.fetchById(subjectId).then((promise) => {
            setSubject({
                id: promise.data.id,
                name: promise.data.name,
                shortName: promise.data.shortName
            });
        });
    }, [subjectId]);

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
        props.onSubjectEdited({
            id: subject.id,
            name: subject.name,
            shortName: subject.shortName
        });
        history.push("/subjects");
    };

    const onBackClick = () => {
        history.push("/subjects");
    };

    const handleSubjectOnChange = (e) => {
        setNameErrorMsg('');
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setSubject({...subject, [paramName]:paramValue});
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
                                <input onChange={handleSubjectOnChange}
                                       name={"name"}
                                       type="text"
                                       className="form-control"
                                       title="Име"
                                       value={subject.name}/>
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
                                <input onChange={handleSubjectOnChange}
                                       name={"shortName"}
                                       type="text"
                                       className="form-control"
                                       title="Кратенка"
                                       value={subject.shortName}/>
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

export default SubjectEdit;
