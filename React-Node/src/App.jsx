import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from "./components/Header.jsx";
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Welcome from "./pages/Welcome.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return(
            <div className="container-fluid vh-100">
                <div className="row">
                    <Header />
                </div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>

    )
}

export default App
