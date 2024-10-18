import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Header from "../components/Header.jsx";


function Dashboard() {
    const [cv, setCv] =useState([]);
    const [criteria, setCriteria] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://cv-generator-klm2.onrender.com/api/cvRouter');
            const data = await res.json();

            setCv(data);

        };fetchData();
        console.log("cvdata :"+cv);
    },[]);


    return (
        <Header />


    );
}

export default Dashboard;