import React from 'react';
import {useNavigate} from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }
    return (

        <div className="container text-center mt-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h1 className="display-4">Bienvenue sur le Générateur de CV</h1>
                    <p className="lead mt-4">
                        Créez facilement des CV professionnels en quelques minutes. Personnalisez votre CV selon vos besoins et téléchargez-le dans différents formats.
                    </p>
                    <button className="btn btn-primary btn-lg mt-4" onClick={goToLogin} >Commencer à créer votre CV</button>
                </div>
                <div className="col-md-6">
                    <img
                        src="src/assets/cv.jpg"
                        alt="Illustration Générateur de CV"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
}

export default Welcome;