import React, { useContext } from "react";
import heartIcon from "../assets/img/sheetsIcons/heart.svg";
import shieldIcon from "../assets/img/sheetsIcons/shield.svg";
import swordIcon from "../assets/img/sheetsIcons/sword.svg";
import lupeIcon from "../assets/img/sheetsIcons/lupe.svg";
import goldIcon from "../assets/img/sheetsIcons/gold.svg";
import { PartyItemContext } from "../contexts/Party.jsx";

const PartyItem = ({ index }) => {
    const { partyData, setPartyData } = useContext(PartyItemContext);
    const {
        img,
        name,
        characterClass,
        level,
        marchingOrder,
        hasLantern,
        life,
        attack,
        defense,
        clues,
        gold,
        statuses,
        spellsAbilities,
        inventory
    } = partyData[index];

    const updatePartyData = (updatedData) => {
        const updatedPartyData = [...partyData];
        updatedPartyData[index] = updatedData;
        setPartyData(updatedPartyData);
    };

    const changeImage = () => {
        const newImageURL = window.prompt("Introduce la URL de la nueva imagen:", img);
        if (newImageURL !== null) {
            updatePartyData({ ...partyData[index], img: newImageURL });
        }
    };

    return (
        <div className="party-item">
            <div className="party-item-header">
                <img className="char-img" src={img} alt={name} onClick={changeImage} />
                <div className="party-item-header-section">
                    <input
                        type="text"
                        value={name}
                        placeholder="Nombre"
                        onChange={(e) => updatePartyData({ ...partyData[index], name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={characterClass}
                        placeholder="Clase"
                        onChange={(e) => updatePartyData({ ...partyData[index], characterClass: e.target.value })}
                    />
                    <p>LVL: <input
                        className="small-num-input"
                        type="number"
                        value={level}
                        onChange={(e) => updatePartyData({ ...partyData[index], level: e.target.value })}
                    /></p>
                    <p>Orden de marcha: <input
                        className="small-num-input"
                        type="number"
                        value={marchingOrder}
                        onChange={(e) => updatePartyData({ ...partyData[index], marchingOrder: e.target.value })}
                    /></p>
                    <p>Linterna: <input
                        type="checkbox"
                        checked={hasLantern}
                        onChange={(e) => updatePartyData({ ...partyData[index], hasLantern: e.target.checked })}
                    /></p>
                </div>
                <div className="party-item-header-section">
                    <div>
                        <img src={heartIcon} alt="heart" />
                        <input
                        className="small-num-input"
                        type="number"
                        value={life}
                        onChange={(e) => updatePartyData({ ...partyData[index], life: e.target.value })}
                        />
                    </div>
                    <div>
                        <img src={swordIcon} alt="sword" />
                        <input
                        className="small-num-input"
                        type="number"
                        value={attack}
                        onChange={(e) => updatePartyData({ ...partyData[index], attack: e.target.value })}
                        />
                    </div>
                    <div>
                        <img src={shieldIcon} alt="shield" />
                        <input
                        className="small-num-input"
                        type="number"
                        value={defense}
                        onChange={(e) => updatePartyData({ ...partyData[index], defense: e.target.value })}
                        />
                    </div>
                    <div>
                        <img src={lupeIcon} alt="Clue" />
                        <input
                        className="small-num-input"
                        type="number"
                        max="3"
                        value={clues}
                        onChange={(e) => updatePartyData({ ...partyData[index], clues: e.target.value })}
                        />
                    </div>
                    <div>
                        <img src={goldIcon} alt="gold" />
                        <input
                        className="gold-input"
                        type="number"
                        value={gold}
                        onChange={(e) => updatePartyData({ ...partyData[index], gold: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="party-item-body">
                <input
                    placeholder="Estados"
                    type="text"
                    value={statuses}
                    onChange={(e) => updatePartyData({ ...partyData[index], statuses: e.target.value })}
                />
                <textarea
                    placeholder="Hechizos/Habilidades"
                    value={spellsAbilities}
                    onChange={(e) => updatePartyData({ ...partyData[index], spellsAbilities: e.target.value })}
                />
                <textarea
                    placeholder="Mochila"
                    value={inventory}
                    onChange={(e) => updatePartyData({ ...partyData[index], inventory: e.target.value })}
                />
            </div>
        </div>
    );
}

export default PartyItem;
