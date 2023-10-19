import React, { createContext, useState, useEffect } from "react";

export const PartyItemContext = createContext();

export const PartyItemProvider = ({ children }) => {
    const [partyData, setPartyData] = useState([
        {
            img: "https://www.analisisdigital.com.ar/sites/default/files/imagenNoticiaDigital/f17cqq1waaana0k.png",
            name: "",
            characterClass: "",
            level: 1,
            marchingOrder: 1,
            hasLantern: false,
            life: 0,
            attack: 0,
            defense: 0,
            clues: 0,
            gold: 0,
            statuses: "",
            spellsAbilities: "",
            inventory: ""
        },
        {
            img: "https://www.analisisdigital.com.ar/sites/default/files/imagenNoticiaDigital/f17cqq1waaana0k.png",
            name: "",
            characterClass: "",
            level: 1,
            marchingOrder: 1,
            hasLantern: false,
            life: 0,
            attack: 0,
            defense: 0,
            clues: 0,
            gold: 0,
            statuses: "",
            spellsAbilities: "",
            inventory: ""
        },
        {
            img: "https://www.analisisdigital.com.ar/sites/default/files/imagenNoticiaDigital/f17cqq1waaana0k.png",
            name: "",
            characterClass: "",
            level: 1,
            marchingOrder: 1,
            hasLantern: false,
            life: 0,
            attack: 0,
            defense: 0,
            clues: 0,
            gold: 0,
            statuses: "",
            spellsAbilities: "",
            inventory: ""
        },
        {
            img: "https://www.analisisdigital.com.ar/sites/default/files/imagenNoticiaDigital/f17cqq1waaana0k.png",
            name: "",
            characterClass: "",
            level: 1,
            marchingOrder: 1,
            hasLantern: false,
            life: 0,
            attack: 0,
            defense: 0,
            clues: 0,
            gold: 0,
            statuses: "",
            spellsAbilities: "",
            inventory: ""
        }
    ]);

    useEffect(() => {
        const storedPartyData = localStorage.getItem("partyData");
        if (storedPartyData) {
            setPartyData(JSON.parse(storedPartyData));
        }
    }, []);

    const saveData = () => {
        localStorage.setItem("partyData", JSON.stringify(partyData));
    };

    return (
        <PartyItemContext.Provider value={{ partyData, saveData, setPartyData }}>
            {children}
        </PartyItemContext.Provider>
    );
}
