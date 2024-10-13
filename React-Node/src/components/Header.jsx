import { Link } from 'react-router-dom';

function Header() {

    return (
        <nav className="navbar navbar-dark bg-dark">
            <ul className="nav">
                <li className="nav-item">
                    <Link to={'/register'} className={'nav-link'}>
                        Register
                    </Link>
                </li>
                <li className="nav-item">

                    <Link to={'/login'} className={'nav-link'}>
                        Login
                    </Link>

                </li>
            </ul>
        </nav>
    );
}

export default Header;