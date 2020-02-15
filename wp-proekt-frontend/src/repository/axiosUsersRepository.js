import axios from '../custom-axios/axios';

const UsersService = {
    login: (username, password) => {
        const user = {
            username: username, 
            password: password
        };
        return axios.post("/login", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

export default UsersService;
