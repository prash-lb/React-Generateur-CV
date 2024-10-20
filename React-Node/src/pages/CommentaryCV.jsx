import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "../Context/UserContext.jsx";
import Header from "../components/Header.jsx";

/**
 * Composant pour afficher un CV avec la possibilité d'ajouter des commentaires.
 * @component
 */
function CommentaryCv() {
    // État pour stocker le commentaire saisi par l'utilisateur
    const [commentaire, setCommentaire] = useState([]);
    // État pour stocker le token de l'utilisateur
    const [token,setToken] = useState(null);
    const navigate = useNavigate();
    const { getUserInfos } = useContext(UserContext);
    // État pour stocker les commentaires récupérés pour le CV
    const [commentaireCV, setCommentaireCV] = useState([]);
    const location = useLocation();
    // Récupération du CV à partir des données de localisation
    const { cv } = location.state || null;
    const id = cv._id

    //pour avoir le token
    useEffect(() => {
        const userInfos = getUserInfos();
        if (!userInfos.user.user.token){
            setToken(null);
            navigate("/login");
        }
        else{
            setToken(userInfos.user.user.token);
        }
    }, [ navigate, getUserInfos]);

    /**
     * Fonction pour mettre à jour l'état du commentaire lorsque l'utilisateur tape.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Événement de changement du textarea.
     */
    const  changeComment = (e) => {
        setCommentaire(e.target.value);
    }
    // useEffect pour récupérer les commentaires associés au CV
    useEffect(()=>{
        const fetchCom = async () => {
            try {
                const res = await fetch(`https://cv-generator-klm2.onrender.com/api/cvRouter/${id}/recommendations`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if(!res.ok) {
                    console.log("Failled to fetch CVs");
                }else{
                    const dataComm = await res.json();
                    setCommentaireCV(dataComm);
                }
            }catch (err){
                console.log(err);
            }
        };
        fetchCom()
    })
    /**
     * Fonction pour soumettre un commentaire au serveur.
     * @param {string} id - ID du CV pour lequel le commentaire est soumis.
     */
    //methode post commentaire
    const submitCommentair = async (id) => {
        const commbody = {
            id: id,
            content : commentaire,
        }
        try {
            const res = await fetch(`https://cv-generator-klm2.onrender.com/api/cvRouter/${id}/recommendations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(commbody)
            });
            if(res.ok) {
                console.log("comment put  cv")
                navigate('/dashboard')
            }
            if(res.status === 401) {
                const errorData = await res.json();
                console.log("Error message:", errorData.message);
                if (errorData.message === "Token has expired, please log in again") {
                    navigate("/login");
                }
            } else{
                console.log("succes commentaire");
            }
        }catch (err){
            console.log("error : "+err);
        }
    }
    return (
        <>
            <Header />

            <div className="container mt-5">
            <div className="row">
                <h2>Le cv de {cv.firstName} {cv.lastName}</h2>
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                {cv.firstName} {cv.lastName}
                            </h5>
                            <h6>Description :</h6>
                            <p className="card-text">{cv.description}</p>
                            <h6>Education :</h6>
                            <ul>
                                {cv.education.map((edu, eduIndex) => (
                                    <li key={eduIndex}>
                                        {edu.title} à {edu.institution} en ({edu.year})
                                    </li>
                                ))}
                            </ul>
                            <h6>Experience</h6>
                            <ul>
                                {cv.experiences.map((exp, expIndex) => (
                                    <li key={expIndex}>
                                        {exp.role} à {exp.company} pour {exp.year}
                                    </li>
                                ))}
                            </ul>
                            <h6>Commentaire</h6>
                            {
                                commentaireCV.length > 0 ? (
                                    <ul>
                                        {commentaireCV.map((com, Index) => (
                                            <li key={Index}>
                                                - {com.content}
                                            </li>
                                        ))}
                                    </ul>
                                ): (
                                    <p>Pas de commentaire</p>
                                )
                            }
                        </div>


                    </div>


                </div>
                <div>
                    <h6>Ajouter un commentaire :</h6>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Ecrire un commentaire..."
                        onChange={changeComment} // Appel à la fonction de mise à jour du commentaire
                    />
                    <button className="btn btn-primary mt-2" onClick={() => submitCommentair(cv._id)}>
                        Commenter
                    </button>
                </div>
            </div>
        </div>
        </>

    );
}

export default CommentaryCv;



















