import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import ProfessorExtended from "../../../Professor/ProfessorExtended/professorExtended";

const ConsultationsFollowing = (props) => {

    const history = useHistory();

    useEffect(() => {
        if(props.student && props.studentFollowingIds.length === 0) {
            history.push('/consultations');
        }
    }, [history, props.student, props.studentFollowingIds.length]);

    const followingLink = () => {
        if(props.studentFollowingIds.length !== 0) {
            return (
                <Link to={"/following"} className={"btn mt-2"} style={{background: "lightgray"}}>
                    Следени професори
                </Link>
            );
        }
    };

    const subNavigation = () => {
        return (
            <div className={"mt-4"}>
                <div className={"row ml-1"}>
                    {followingLink()}
                    <Link to={"/consultations"} className={"btn mr-2 mt-2"}>
                        Сите професори
                    </Link>
                </div>
                <hr />
            </div>
        );
    };

    const consultations = () => {
        let i = 0;
        return props.professors.filter(p => props.studentFollowingIds.includes(p.id)).map(p =>
            <ProfessorExtended key={p.id} value={p} index={i++} student={props.student}
                       studentSlotIds={props.studentSlotIds}
                       onStudentAddedToSlot={props.onStudentAddedToSlot}
                       onStudentRemovedFromSlot={props.onStudentRemovedFromSlot}
                       studentFollowingIds={props.studentFollowingIds}
                       followProfessor={props.followProfessor}
                       unfollowProfessor={props.unfollowProfessor} />
        );
    };

    return (
        <div>
            {subNavigation()}
            <div className="row mb-5">
                {consultations()}
            </div>
        </div>
    );
};

export default ConsultationsFollowing;
