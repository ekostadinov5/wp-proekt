import React from 'react';
import {Link} from "react-router-dom";
import Professor from "../../../Professor/professor";

const ConsultationsFollowing = (props) => {
    
    const subNavigation = () => {
        return (
            <div className={"mt-4"}>
                <div className={"row ml-1"}>
                    <Link to={"/consultations"} className={"btn mr-2 mt-2"}>
                        Сите професори
                    </Link>
                    <Link to={"/following"} className={"btn mt-2"} style={{background: "lightgray"}}>
                        Следени професори
                    </Link>
                </div>
                <hr />
            </div>
        );
    };

    const consultations = () => {
        let i = 0;
        return props.professors.filter(p => props.studentFollowingIds.includes(p.id)).map(p =>
            <Professor key={p.id} value={p} index={i++} student={props.student}
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
