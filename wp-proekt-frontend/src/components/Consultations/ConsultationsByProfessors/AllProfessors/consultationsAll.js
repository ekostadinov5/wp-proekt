import React from 'react';
import Professor from '../../../Professor/professor';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";

import AppContext from '../../../../context/AppContext';

const ConsultationsAll = (props) => {

    const subNavigation = () => {
        return (
            <div className={"mt-4"}>
                <div className={"row ml-1"}>
                    <Link to={"/consultations"} className={"btn mr-2 mt-2"} style={{background: "lightgray"}}>
                        Сите професори
                    </Link>
                    <Link to={"/following"} className={"btn mt-2"}>
                        Следени професори
                    </Link>
                </div>
                <hr />
            </div>
        );
    };

    const consultations = () => {
        let i = 0;
        return props.consultations.map(professor =>
            <Professor key={professor.id} value={professor} index={i++} student={props.student} 
                       studentSlotIds={props.studentSlotIds}
                       onStudentAddedToSlot={props.onStudentAddedToSlot} 
                       onStudentRemovedFromSlot={props.onStudentRemovedFromSlot}
                       studentFollowingIds={props.studentFollowingIds} 
                       followProfessor={props.followProfessor} 
                       unfollowProfessor={props.unfollowProfessor} />
        );
    };

    const handlePageClick = (e) => {
        props.onPageClick(e.selected);
    };

    const pagination = () => {
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"претходна"}
                               nextLabel={"следна"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={1}
                               pageRangeDisplayed={2}
                               pageClassName={"page-item"}
                               pageLinkClassName={"btn page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"btn page-link"}
                               nextLinkClassName={"btn page-link"}
                               forcePage={props.page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"} />
            )
        }
    };

    return (
        <AppContext.Consumer>
            {context => {
                return (
                    <div>
                        {(() => {
                            if(context.role === 'student') {
                                return subNavigation();
                            }
                        })()}
                        <div className="row mb-5">
                            {consultations()}
                        </div>
                        {pagination()}
                    </div>
                );
            }}
        </AppContext.Consumer>
    );
};

export default ConsultationsAll;
