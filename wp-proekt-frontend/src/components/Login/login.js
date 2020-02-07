import React from 'react';

const Login = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("NOT IMPLEMENTED!");
    };

    return (
        <div className={"col-md-6 mx-auto mt-5"}>
            <hr/>
            <form onSubmit={onSubmit} className={"mt-5"}>
                <div className="row form-group">
                    <div className="col-md-5 font-weight-bold text-right">Корисничко име:</div>
                    <div className={"col-md-7"}>
                        <input name={"username"} type="text"
                               className="form-control"
                               title="Корисничко име"/>
                    </div>
                </div>
                <div className="row form-group mt-4">
                    <div className="col-md-5 font-weight-bold text-right">Лозинка:</div>
                    <div className={"col-md-7"}>
                        <input name={"password"} type={"password"}
                               className="form-control"
                               title="Лозинка"/>
                    </div>
                </div>
                <div className={"row my-4"}>
                    <div className="col-md-12 text-right">
                        <button type="submit" className="btn btn-primary" title="Најави се">
                            Најави се
                        </button>
                    </div>
                </div>
            </form>
            <hr/>
        </div>
    );
};

export default Login;
