import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

// Création du contexte utilisateur
/**
 * Contexte utilisateur pour gérer l'authentification et les informations d'utilisateur.
 * @type {React.Context}
 */
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (logInfos) => {
        const userInfo = { ...logInfos };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));

    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Fonction pour récupérer les infos utilisateur (email, username) et CV depuis le localStorage
    const getUserInfos = () => {
        if (user  ) {
            return { user};
        } else {
            const storedUser = localStorage.getItem('user');
            if (storedUser  ) {
                setUser(JSON.parse(storedUser));
                return { user: JSON.parse(storedUser) };
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
