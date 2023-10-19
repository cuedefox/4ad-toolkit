import React, { useContext } from "react";
import PartyItem from "../components/PartyItem.jsx";
import { PartyItemContext } from "../contexts/Party.jsx";

const PartyContainer = () => {
    const { saveData } = useContext(PartyItemContext);

    return (
        <div className="party-container">
            <div className="party">
                <PartyItem className="party-item-1" index={0} />
                <PartyItem className="party-item-2" index={1} />
                <PartyItem className="party-item-3" index={2} />
                <PartyItem className="party-item-4" index={3} />
            </div>
            <div className="party-save-buts">
                <button onClick={saveData}>Guardar</button>
            </div>
        </div>
    );
}

export default PartyContainer;
