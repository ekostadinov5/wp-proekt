import React from 'react';
import Professor from '../Professor/professor';

const consultations = (props) => {

    const consultations = () => {
        let i = 0;
        return props.consultations.map(professor =>
            <Professor key={professor.id} value={professor} index={i++} />
        );
    }

    const pagination = () => {
        return (
            <nav aria-label="Page navigation example" className="mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        );
    }

    return (
        <div>
            <div className="row">
                {consultations()}
            </div>
            {pagination()}
        </div>
    );
}

export default consultations;
