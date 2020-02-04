import React from 'react';
import {Link} from "react-router-dom";
import ProfessorConsultationTerm from '../ProfessorConsultationTerm/professorConsultationTerm';

const ProfessorConsultations = (props) => {

    const consultationTerms = () => {
        return (props.professor) ?
            props.professor.slots
                .sort((s1, s2) => (s1.dayOfWeek === null) - (s2.dayOfWeek === null)) // Date.parse(`01/01/2020 ${s1.from}`) > Date.parse(`01/01/2020 ${s2.from}
                .map(s => <ProfessorConsultationTerm key={s.id} value={s} onTermDeleted={props.onConsultationSlotDeleted} />)
            :
            null;
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
