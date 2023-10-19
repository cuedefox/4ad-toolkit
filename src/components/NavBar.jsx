import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return <header>
        <nav className="menu">
            <Link className="nav-title" to={"/"} >
                <h2>4AD Toolkit</h2>
            </Link>
            <ul className="nav-tabs">
                <li><Link to={"/"}>Inicio</Link></li>
                <li><Link to={"/party"}>Equipo</Link></li>
                <li><Link to={"/Tables"}>Tablas</Link></li>
            </ul>
        </nav>
    </header>
}

export default NavBar;