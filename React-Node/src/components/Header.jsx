import { Link } from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../Context/UserContext.jsx";

/**
 * Juste le Header de l'app
 * */
function Header() {
    const {logout } = useContext(UserContext);
    return (
        <nav className="navbar navbar-dark bg-dark">
            <ul className="nav w-100">
                <li className="nav-item">
                    <Link to={'/dashboard'} className={'nav-link'}>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                        <Link to={'/createcv'} className={'nav-link'}>
                            Mon CV
                        </Link>
                </li>
                <li className="nav-item ms-auto">
                    <Link to={'/'}  onClick={logout} className={'nav-link'} role="button">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
