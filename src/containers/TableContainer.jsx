import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tables from "../db/tables.json";
import { dice } from "../utils/diceRolls";
import { roomContentTable1 } from "../utils/table1Data";
import LogItem from "../components/LogItem";

const TableContainer = () => {
    const [roomImg, setRoomImg] = useState(dice(6));
    const [roomContentImg, setRoomContentImg] = useState("");
    const [matchVars, setMatchVars] = useState({
        healerEncountered: false,
        alchemistEncountered: false,
        bossesDefeated: 0,
        minionEncounters: 0
    });
    const [logs, setLogs] = useState([]);
    const [canSearch, setCanSearch] = useState(false);

    const {id} = useParams();
    let table = tables.find(table => table.id === parseInt(id));
    const cargarImagen = require.context("../assets/img/tables", true);
    const corridors = ['11', '12', '13', '14', '26', '32', '33', '42', '45', '51', '53', '55', '62', '63', '65'];
    const roomType = corridors.includes(roomImg) ? 'corridor' : 'room';

    useEffect(() => {}, [roomImg, roomType, roomContentImg, matchVars, logs, canSearch])

    function newRoom() {
        setRoomImg(`${dice(6)}${dice(6)}`);
        const roomContent = roomContentTable1(roomType, matchVars);
        setLogs([roomContent.log]);
        setRoomContentImg(roomContent?.img);
        setMatchVars({
            healerEncountered: roomContent?.healerEncountered || false,
            alchemistEncountered: roomContent?.alchemistEncountered || false,
            bossesDefeated: roomContent?.bossesDefeated ? roomContent.bossesDefeated + matchVars.bossesDefeated : matchVars.bossesDefeated,
            minionEncounters: roomContent?.minionEncounters ? roomContent.minionEncounters + matchVars.bossesDefeated : matchVars.bossesDefeated,
        });
        setCanSearch(roomContent.canSearch);
    }

    function search() {

    }
    
    return <div className="table-container">
        <h1>Tabla de {table.name}</h1>
        <div className="table-data">
            <div className="table-room-img">
                <h3>Tipo: {roomType}</h3>
                <img src={cargarImagen(`./${table.tableRooms}/rooms/${roomImg}.png`)} alt={`room ${roomImg}`} />
            </div>
            <div className="table-room-content">
                <img src="" alt="" />
                <div className="table-room-content-log">
                    {
                        logs.map(log => <LogItem log={log} />)
                    }
                </div>
            </div>
        </div>
        <div className="table-buts">
            <button onClick={newRoom}>Generar nueva habitacion</button>
            {
                canSearch ? <button onClick={search}>Buscar</button> : null
            }
        </div>
    </div>
}

export default TableContainer;