import React from 'react';
import Term from '../Consultations/ConsultationTerm/term';

import AppContext from '../../context/AppContext';

const Professor = (props) => {

    const isFollowingProfessor = () => {
        let exists = false;
        props.studentFollowingIds.forEach(id => {
            if(id === props.value.id){
                exists = true;
            }
        });
        return exists;
    };

    const followUnfollowButtonClick = () => {
        if(!isFollowingProfessor()) {
            props.followProfessor(props.student.index, props.value.id);
        } else {
            props.unfollowProfessor(props.student.index, props.value.id);
        }
    };

    const followUnfollowButton = () => {
        if(!isFollowingProfessor()) {
            return (
                <button onClick={followUnfollowButtonClick} className="btn btn-light" title="Следи">
                    <i className="fa fa-fw fa-star-o"/>
                </button>
            );
        } else {
            return (
                <button onClick={followUnfollowButtonClick} className="btn btn-light" title="Следи">
                    <i className="fa fa-fw fa-star"/>
                </button>
            );
        }
    };

    const termsWeekly = () => {
        return (
            <AppContext.Consumer>
                {context => props.value.slots
                    .filter(cs => cs.dayOfWeek)
                    .sort((cs1, cs2) => (context.getDayOfWeekIntValue(cs1.dayOfWeek) - context.getDayOfWeekIntValue(cs2.dayOfWeek))
                    || context.compareTimeVars(cs1.from, cs2.from))
                    .map(term => <Term key={term.id} value={term} student={props.student} 
                                       studentSlotIds={props.studentSlotIds} 
                                       onStudentAdded={props.onStudentAddedToSlot} 
                                       onStudentRemoved={props.onStudentRemovedFromSlot}
                                       professor={props.value} />)
                }
            </AppContext.Consumer>
        );
    };

    const termsDay = () => {
        return (
            <AppContext.Consumer>
                {context => props.value.slots
                    .filter(cs => cs.date)
                    .sort((cs1, cs2) => (new Date(cs1.date) - new Date(cs2.date)) || context.compareTimeVars(cs1.from, cs2.from))
                    .map(term =>
                        <Term key={term.id} value={term} student={props.student}
                              studentSlotIds={props.studentSlotIds}
                              onStudentAdded={props.onStudentAddedToSlot}
                              onStudentRemoved={props.onStudentRemovedFromSlot}
                              professor={props.value} />)
                }
            </AppContext.Consumer>
        );
    };

    const cardHeader = () => {
        return (
            <div className="professors card-header">
                <div className="row">
                    <div className="col-8">
                        {props.value.title} {props.value.firstName} {props.value.lastName}
                    </div>
                    <div className="col-4 text-right">
                        {followUnfollowButton()}
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
        <div className="col-lg-4 col-md-6 mt-5 col-sm-12">
            <div className="card">
                {cardHeader()}
                {cardBody()}
            </div>
        </div>
    );
};

export default Professor;
