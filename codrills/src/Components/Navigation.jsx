import React from 'react'
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/Drills">Drills</Link>
        </div>
    )
}

export default Navigation