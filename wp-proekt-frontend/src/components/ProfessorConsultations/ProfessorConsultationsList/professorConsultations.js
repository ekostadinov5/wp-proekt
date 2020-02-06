import React from 'react';
import {Link} from "react-router-dom";
import ProfessorConsultationTerm from '../ProfessorConsultationTerm/professorConsultationTerm';

const ProfessorConsultations = (props) => {

    const consultationTermsWeekly = () => {
        return props.professor ? props.professor.slots
            .filter(t => t.dayOfWeek)
            .sort((t1, t2) => (props.getDayOfWeekIntValue(t1.dayOfWeek) - props.getDayOfWeekIntValue(t2.dayOfWeek))
                || props.compareTimeVars(t1.from, t2.from))
            .map(term =>
                <ProfessorConsultationTerm key={term.id} value={term}
                                           convertDay={props.convertDay}
                                           onTermDeleted={props.onConsultationSlotDeleted} />) : null;
    };

    const consultationTermsDay = () => {
        return props.professor ? props.professor.slots
            .filter(t => t.date)
            .sort((t1, t2) => (new Date(t1.date) - new Date(t2.date)) || props.compareTimeVars(t1.from, t2.from))
            .map(term =>
                <ProfessorConsultationTerm key={term.id} value={term}
                                           convertDay={props.convertDay}
                                           onTermDeleted={props.onConsultationSlotDeleted} />) : null;
    };

    return (
        <>
            <Link className={"btn btn-success btn-lg rounded mt-2"} to={"/consultations/add"}>
                <i className="fa fa-fw fa-plus mr-3"/>
                Додади консултациски термин
            </Link>
            <div className={"row"}>
                {consultationTermsWeekly()}
                {consultationTermsDay()}
            </div>
        </>
    );
};

export default ProfessorConsultations;
