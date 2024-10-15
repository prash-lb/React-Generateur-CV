import React, {useEffect, useState} from 'react';

function Cv() {
    const [cv, setCv] = React.useState([]);
    const [criteria, setCriteria] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/CV');
            const data = await res.json();
            setCv(data)
        };fetchData();
    },[]);

   /* useEffect(() => {
        setFilteredUsers(cv.filter((user) => user.firstname === user.email));
    })*/
    return (
        <div></div>
    );
}

export default Cv;