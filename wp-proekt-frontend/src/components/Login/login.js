import React, {useState} from 'react';

import UserService from '../../repository/axiosUsersRepository';
import LocalStorageService from '../../services/localStorageService';

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        UserService.login(e.target.username.value, e.target.password.value).then((promise) => {
            LocalStorageService.setToken(promise.headers.authorization);
            LocalStorageService.setRole(promise.headers.role);
            LocalStorageService.setIdentifier(promise.headers.identifier);
            window.location.href = '/';
        }).catch((error) => {
            if(error.response.status === 403) {
                setErrorMessage('Корисничкото име или лозинката кои ги внесовте се невалидни.');
            }
        });
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
                <div className='text-right'>
                    <small className='text-danger'>
                        {errorMessage}
                    </small>
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
