import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (logInfos) =>{
        setUser({logInfos , name:'Toto'});
        localStorage.setItem('user',JSON.stringify({ ...logInfos, name: 'Toto' }));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const getUserInfos = () => {
        if (user) {
            return user;
        } else {
            const storeUser = localStorage.getItem('user');
            if (storeUser) {
                setUser(JSON.parse(storeUser));
                return storeUser;
            }
        }
    };

    return <UserContext.Provider value={{ login, getUserInfos, logout }}>{children}</UserContext.Provider>;

};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export {UserProvider};