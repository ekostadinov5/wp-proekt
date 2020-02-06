import React from 'react';
import Term from '../Consultations/ConsultationTerm/term';

const Professor = (props) => {

    const termsWeekly = () => {
        return props.value.slots
            .filter(cs => cs.dayOfWeek)
            .sort((cs1, cs2) => (props.getDayOfWeekIntValue(cs1.dayOfWeek) - props.getDayOfWeekIntValue(cs2.dayOfWeek))
                || props.compareTimeVars(cs1.from, cs2.from))
            .map(term =>
                <Term key={term.id} value={term} student={props.student}
                      studentSlotIds={props.studentSlotIds} convertDay={props.convertDay}
                      onStudentAdded={props.onStudentAddedToSlot}
                      onStudentRemoved={props.onStudentRemovedFromSlot} />);
    };

    const termsDay = () => {
        return props.value.slots
            .filter(cs => cs.date)
            .sort((cs1, cs2) => (new Date(cs1.date) - new Date(cs2.date)) || props.compareTimeVars(cs1.from, cs2.from))
            .map(term =>
                <Term key={term.id} value={term} student={props.student}
                      studentSlotIds={props.studentSlotIds} convertDay={props.convertDay}
                      onStudentAdded={props.onStudentAddedToSlot}
                      onStudentRemoved={props.onStudentRemovedFromSlot} />);
    };

    const cardHeader = () => {
        return (
            <div className="card-header">
                <div className="row">
                    <div className="col-8">
                        {props.value.title} {props.value.firstName} {props.value.lastName}
                    </div>
                    <div className="col-4 text-right">
                        <button className="btn btn-light" title="Следи">
                            <i className="fa fa-fw fa-star"/>
                        </button>
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
