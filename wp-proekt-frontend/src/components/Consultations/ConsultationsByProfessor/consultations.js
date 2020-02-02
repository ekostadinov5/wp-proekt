import React from 'react';
import Professor from '../../Professor/professor';
import ReactPaginate from 'react-paginate';

const Consultations = (props) => {

    const handlePageClick = (e) => {
        props.onPageClick(e.selected);
    }

    const consultations = () => {
        let i = 0;
        return props.consultations.map(professor =>
            <Professor key={professor.id} value={professor} index={i++} />
        );
    }

    const pagination = () => {
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"претходна"}
                               nextLabel={"следна"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    }

    return (
        <div>
            <div className="row mb-5">
                {consultations()}
            </div>
            {pagination()}
        </div>
    );
}

export default Consultations;
