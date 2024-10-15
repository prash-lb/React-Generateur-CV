import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Création du contexte utilisateur
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cvData, setCvData] = useState(null);

    const login = (logInfos, cvInfos) => {
        const userInfo = { ...logInfos };
        const cvInfo = { ...cvInfos };

        console.log("Storing user: ", userInfo);
        console.log("Storing CV: ", cvInfo);

        setUser(userInfo);
        setCvData(cvInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('cvData', JSON.stringify(cvInfo));
    };

    const logout = () => {
        setUser(null);
        setCvData(null);
        console.log("info:+"+localStorage.getItem('user'));
        localStorage.removeItem('user');
        localStorage.removeItem('cvData');
        console.log("info:+"+localStorage.getItem('user'));

    };

    // Fonction pour récupérer les infos utilisateur (email, username) et CV depuis le localStorage
    const getUserInfos = () => {
        if (user && cvData) {
            return { user, cvData };
        } else {
            const storedUser = localStorage.getItem('user');
            const storedCvData = localStorage.getItem('cvData');

            if (storedUser && storedCvData) {
                setUser(JSON.parse(storedUser));
                setCvData(JSON.parse(storedCvData));
                return { user: JSON.parse(storedUser), cvData: JSON.parse(storedCvData) };
            }
        }
    };

    return (
        <UserContext.Provider value={{ login, getUserInfos, logout }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserProvider };
