import React from 'react';
import Subject from '../Subject/subject';
import {Link} from "react-router-dom";

const Subjects = (props) => {
    
    const subjects = () => {
        return props.subjects
            .sort((s1, s2) => s1.name.localeCompare(s2.name))
            .map(s => <Subject key={s.id} value={s} onDelete={props.onSubjectDelete} />);
    };
    
    return(
        <div role="main" className="mt-3">
            <div className="container">
                <Link className={"btn btn-success btn-lg rounded mt-2"} to={"/subjects/add"}>
                    <i className="fa fa-fw fa-plus mr-3"/>
                    Додади предмет
                </Link>
                <div className={"row mt-2"}>
                    {subjects()}
                </div>
            </div>
        </div>
    );
};

export default Subjects;
