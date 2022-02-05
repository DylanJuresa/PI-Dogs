import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";


export default function LandingPage() {
    return (
        <div className="estiloLanding">
            <h1>Bienvenidos a Henry Dogs!</h1>
            <Link to="/dogs">
                <button className="estiloButton">Ingresar</button>
            </Link>
        </div>
    )
}