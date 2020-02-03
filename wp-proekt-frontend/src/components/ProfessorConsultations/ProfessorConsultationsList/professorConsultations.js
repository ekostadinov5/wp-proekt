import React from 'react';
import {Link} from "react-router-dom";
import ProfessorConsultationTerm from '../ProfessorConsultationTerm/professorConsultationTerm';

const ProfessorConsultations = (props) => {

    const consultationTerms = () => {
        return (props.professor) ? props.professor.slots.map(s => <ProfessorConsultationTerm key={s.id} value={s} />) : null;
    }

    return (
        <>
            <Link className={"btn btn-success btn-lg rounded mt-2"} to={"/consultations/add"}>
                <i className="fa fa-fw fa-plus mr-3"/>
                Додади консултациски термин
            </Link>
            <div className={"row"}>
                {consultationTerms()}
            </div>
        </>
    );
}

export default ProfessorConsultations;
