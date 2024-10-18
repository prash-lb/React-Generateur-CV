import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Création du contexte utilisateur
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cvData, setCvData] = useState(null);
    const [token, setToken] = useState(null); // Ajout du token

    const login = (logInfos, cvInfos,jwtToken) => {
        const userInfo = { ...logInfos };
        const cvInfo = { ...cvInfos };

        console.log("Storing user: ", userInfo);
        console.log("Storing CV: ", cvInfo);

        setUser(userInfo);
        setCvData(cvInfo);
        setToken(jwtToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('cvData', JSON.stringify(cvInfo));
        localStorage.setItem('token', jwtToken);

    };

    const logout = () => {
        setUser(null);
        setCvData(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('cvData');
        localStorage.removeItem('token');
    };

    // Fonction pour récupérer les infos utilisateur (email, username) et CV depuis le localStorage
    const getUserInfos = () => {
        if (user && cvData && token) {
            return { user, cvData , token };
        } else {
            const storedUser = localStorage.getItem('user');
            const storedCvData = localStorage.getItem('cvData');
            const storedToken = localStorage.getItem('token');
            if (storedUser && storedCvData && storedToken) {
                setUser(JSON.parse(storedUser));
                setCvData(JSON.parse(storedCvData));
                setToken(storedToken);
                return { user: JSON.parse(storedUser), cvData: JSON.parse(storedCvData) ,token:storedToken };
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
