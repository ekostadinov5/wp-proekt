import React from 'react';
import Term from '../Consultations/ConsultationTerm/term';

const Professor = (props) => {

    const termsWeekly = () => {
        return props.value.slots.map(term =>
            (term.dayOfWeek) ? <Term key={term.id} value={term} student={props.student}
                                     studentSlotIds={props.studentSlotIds}
                                     onStudentAdded={props.onStudentAddedToSlot}
                                     onStudentRemoved={props.onStudentRemovedFromSlot} /> : null);
    };

    const termsDay = () => {
        return props.value.slots.map(term =>
            (term.date) ? <Term key={term.id} value={term} student={props.student}
                                studentSlotIds={props.studentSlotIds}
                                onStudentAdded={props.onStudentAddedToSlot}
                                onStudentRemoved={props.onStudentRemovedFromSlot} /> : null);
    };

    const cardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-8">
                        {props.value.title} {props.value.firstName} {props.value.lastName}
                    </div>
                    <div className="col-4 text-right">
                        <a href="#" className="btn btn-light" title="Следи">
                            <i className="fa fa-fw fa-star"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    const cardBody = () => {
        return (
            <>
                <button className="btn btn-info" type="button" data-toggle="collapse"
                        data-target={"#collapseProfessor" + props.index} aria-expanded="false"
                        aria-controls={"collapseProfessor" + props.index}>
                    Термини
                </button>
                <div className={"collapse"} id={"collapseProfessor" + props.index}>
                    <div className="card-body">
                        <div className="card-text">
                            Редовни консултации:
                            <hr />
                            {termsWeekly()}
                            Дополнителни консултации:
                            <hr />
                            {termsDay()}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="col-lg-4 col-md-6 mt-4 col-sm-12">
            <div className="card">
                {cardHeader()}
                {cardBody()}
            </div>
        </div>
    );
};

export default Professor;
