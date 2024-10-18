import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from "./components/Header.jsx";
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Welcome from "./pages/Welcome.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Cv from "./pages/CV.jsx";

function App() {
    return(

        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/Cv" element={<Cv/>}/>

        </Routes>

    )
}

export default App
