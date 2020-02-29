import React from 'react';
import {Link} from "react-router-dom";
import ProfessorConsultationTerm from '../ProfessorConsultationTerm/professorConsultationTerm';

import AppContext from '../../../context/AppContext';

const ProfessorConsultations = (props) => {

    const consultationTermsWeekly = () => {
        return (
            <AppContext.Consumer>
                {context => props.professor ? props.professor.slots
                    .filter(t => t.dayOfWeek)
                    .sort((t1, t2) => (context.getDayOfWeekIntValue(t1.dayOfWeek) - context.getDayOfWeekIntValue(t2.dayOfWeek))
                        || context.compareTimeVars(t1.from, t2.from))
                    .map(term =>
                        <ProfessorConsultationTerm key={term.id} value={term}
                                                   onTermDeleted={props.onConsultationSlotDeleted}
                                                   onTermCanceled={props.onConsultationSlotCanceled}
                                                   onTermUncanceled={props.onConsultationSlotUncanceled} />) : null
                }
            </AppContext.Consumer>
        );
    };

    const consultationTermsDay = () => {
        return (
            <AppContext.Consumer>
                {context => props.professor ? props.professor.slots
                    .filter(t => t.date)
                    .sort((t1, t2) => (new Date(t1.date) - new Date(t2.date)) || context.compareTimeVars(t1.from, t2.from))
                    .map(term => <ProfessorConsultationTerm key={term.id} value={term}
                                                            onTermDeleted={props.onConsultationSlotDeleted} />) : null
                }
            </AppContext.Consumer>
        );
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
