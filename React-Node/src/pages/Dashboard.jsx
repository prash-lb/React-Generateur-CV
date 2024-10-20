import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Filter from "../components/Filter.jsx";
import {UserContext} from "../Context/UserContext.jsx";
import {useNavigate} from "react-router-dom";


function Dashboard() {
    const [cvs,setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [criteria, setCriteria] = useState('');
    const [filteredCV, setFilteredCV] = useState([]);

    const { getUserInfos } = useContext(UserContext);
    const [token,setToken] = useState(null);
    const [cv,setCv] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfos = getUserInfos();
        console.log("tokken :"+userInfos.user.user.token);
        if (!userInfos.user.user.token){
            setToken(null);
            navigate("/login");

        }
        else{
            setToken(userInfos.user.user.token);
        }
    }, [ navigate, getUserInfos]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch('https://cv-generator-klm2.onrender.com/api/cvRouter',{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }});
                if(!res.ok) {
                    console.log("Failled to fetch CVs");
                }
                const data = await res.json();

                setCvs(data);
                setCv(data.filter((cv) => (cv.user ===  getUserInfos().user.user.id)));
                setLoading(false);
            }catch (err){
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    },[cv, cvs, getUserInfos])

    useEffect(() => {
        setFilteredCV(cvs.filter((cv) => (cv.firstName.toLowerCase().includes(criteria.toLowerCase()) || cv.lastName.toLowerCase().includes(criteria.toLowerCase())) && cv.isVisible));
    },[criteria,cvs]);


    const DeleteCv = async () => {
        console.log("cv : "+JSON.stringify(cv));
        const cvid = cv[0]._id;
        console.log("cvid : "+cvid);
        try{
            const res = await fetch(`https://cv-generator-klm2.onrender.com/api/cvRouter/${cvid}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${token}`,
                },
            });
            if(!res.ok) {
                console.log("error delete cv")
            }
            if(res.status === 401) {
                const errorData = await res.json();
                console.log("Error message:", errorData.message);
                if (errorData.message === "Token has expired, please log in again") {
                    navigate("/login");
                }
            }
        }catch (err){
            console.log("error : "+err);
        }
    };

    if(loading){
        return (
            <>
                <Header/>
                <div className="container mt-5">
                    <h2 >Les CV : </h2>
                </div>
                    <p>Loading CVs...</p>
            </>
        )
    }
    if(error){
        return (
            <>
                <Header/>
                <div className="container mt-5">
                    <h2 >Les CV : </h2>
                </div>
                <p>{error}</p>
            </>
        )
    }

    return (
        <>
        <Header/>
        <div className="container mt-5">
            <h1>Votre CV:</h1>
            <div className="row">
                {cv.length > 0 ? (
                    <div className="col-md-4 mb-4" >
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {cv[0].firstName} {cv[0].lastName}
                                </h5>
                                <h6>Description :</h6>
                                <p className="card-text">{cv[0].description}</p>
                                <h6>Education :</h6>
                                <ul>
                                    {cv[0].education.map((edu, eduIndex) => (
                                        <li key={eduIndex}>
                                            {edu.title} à {edu.institution} en ({edu.year})
                                        </li>
                                    ))}
                                </ul>
                                <h6>Experience</h6>
                                <ul>
                                    {cv[0].experiences.map((exp, expIndex) => (
                                        <li key={expIndex}>
                                            {exp.role} à {exp.company} pour {exp.year}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="btn btn-danger" onClick={() => DeleteCv()}>
                                Supprimer
                            </button>
                            <button className="btn " onClick={() => navigate("/gestioncv")}>
                                Modifier
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>pas de cv </p>
                )}
            </div>
            <h2>Les CV : </h2>
                        <Filter criteria={criteria} setCriteria={setCriteria}/>
                        <div className="row">
                            {filteredCV.length > 0 ? (
                                filteredCV.map((cv, index) => (
                                    <div className="col-md-4 mb-4" key={index}>
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
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No CVs available</p>
                            )}

                        </div>
                    </div>
                    </>
                    );
                }

                export default Dashboard;