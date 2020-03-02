import React from 'react';
import Term from '../../Consultations/ConsultationTerm/term';
import {useHistory} from 'react-router-dom';

import AppContext from '../../../context/AppContext';

const ProfessorExtended = (props) => {

    const history = useHistory();

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
            if(props.studentFollowingIds.length === 1) {
                history.push('/consultations');
            }
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
                <button onClick={followUnfollowButtonClick} className="btn btn-light" title="Откажи следење">
                    <i className="fa fa-fw fa-star"/>
                </button>
            );
        }
    };

    const termsWeekly = () => {
        return (
            <AppContext.Consumer>
                {context => props.value.weeklyTerms
                    .sort((t1, t2) => (context.getDayOfWeekIntValue(t1.dayOfWeek) - context.getDayOfWeekIntValue(t2.dayOfWeek))
                        || context.compareTimeVars(t1.from, t2.from))
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
            <AppContext.Consumer>
                {context => (
                    <div className="professors card-header">
                        <div className="row">
                            <div className="col-8">
                                {props.value.title} {props.value.firstName} {props.value.lastName}
                            </div>
                            {(() => {
                                if(context.role === 'student') {
                                    return (
                                        <div className="col-4 text-right">
                                            {followUnfollowButton()}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    };

    const cardBody = () => {
        return (
            <div className="card-body" style={{maxHeight: '370px', overflowY: 'auto'}}>
                <div className="card-text">
                    <strong>Редовни консултации:</strong>
                    <hr />
                    {termsWeekly()}
                    <strong>Дополнителни консултации:</strong>
                    <hr />
                    {termsDay()}
                </div>
            </div>
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

export default ProfessorExtended;
