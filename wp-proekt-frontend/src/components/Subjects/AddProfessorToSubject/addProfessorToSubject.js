import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import SubjectService from "../../../repository/axiosSubjectRepository";

const AddProfessorToSubject = (props) => {

    const [subject, setSubject] = useState({id: '', name: '', shortName: ''});
    const [professors, setProfessors] = useState([]);

    const {subjectId} = useParams();

    useEffect(() => {
        SubjectService.fetchById(subjectId).then((promise) => {
            setSubject({
                id: promise.data.id,
                name: promise.data.name,
                shortName: promise.data.shortName
            });
        });
        SubjectService.getProfessors(subjectId).then((promise) => {
            setProfessors(props.professors.filter(professor => {
                let flag = true;
                promise.data.forEach(addedProfessor => {
                    if(professor.id === addedProfessor.id) {
                        flag = false;
                    }
                });
                return flag;
            }));
        });
    }, [props.professors, subjectId]);

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onProfessorAddedToSubject(subject.id, e.target.professor.value);
        history.push("/subjects");
    };
    
    const onBackClick = () => {
        history.push("/subjects");
    };

    const options = professors.map(p =>
        <option key={p.id} value={p.id}>
            {p.lastName} {p.title} {p.firstName}
        </option>
    );

    return (
        <div>
            <hr/>
            <form onSubmit={onFormSubmit} className={"mt-5"}>
                <div className="row form-group mb-0">
                    <div className="col-md-4 font-weight-bold text-right">Предмет:</div>
                    <div className="col-lg-6 col-md-8">
                        <div className="row">
                            <div className="col-md-8 text-right">
                                <input name={"subject"}
                                       type="text"
                                       className="form-control"
                                       title="Предмет" 
                                       disabled={true} 
                                       value={subject.name}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row form-group mt-3 mb-0">
                    <div className="col-md-4 font-weight-bold text-right">Професор:</div>
                    <div className={"col-lg-6 col-md-8"}>
                        <div className="row">
                            <div className="col-md-8 text-left">
                                <select name={"professor"} className="form-control" title={"Професори"}>
                                    {options}
                                </select>
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

export default AddProfessorToSubject;
