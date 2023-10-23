import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tables from "../db/tables.json";
import { dice } from "../utils/diceRolls";
import { roomContentTable1, table1Corridors } from "../utils/table1Data";
import LogItem from "../components/LogItem";

const TableContainer = () => {
    const [roomImg, setRoomImg] = useState(dice(6));
    const [roomContentImg, setRoomContentImg] = useState("default.jpg");
    const [matchVars, setMatchVars] = useState({
        healerEncountered: false,
        alchemistEncountered: false,
        bossesDefeated: 0,
        minionEncounters: 0
    });
    const [logs, setLogs] = useState([]);
    const [canSearch, setCanSearch] = useState(false);
    const [canTouchStatue, setCanTouchStatue] = useState(false);
    const [reactionLog, setReactionLog] = useState('');
    const [canWaitReaction, setCanWaitReaction] = useState(false);

    const {id} = useParams();
    let table = tables.find(table => table.id === parseInt(id));
    const cargarImagen = require.context("../assets/img/tables", true);
    const roomType = table1Corridors.includes(roomImg) ? 'corridor' : 'room';

    useEffect(() => {}, [roomImg, roomType, roomContentImg, matchVars, logs, canSearch, canTouchStatue, canWaitReaction])

    function newRoom() {
        setRoomImg(`${dice(6)}${dice(6)}`);
        const roomContent = roomContentTable1(roomType, matchVars);
        setLogs([roomContent.log]);
        setRoomContentImg(roomContent?.img || "default.jpg");
        setMatchVars({
            healerEncountered: roomContent?.healerEncountered || false,
            alchemistEncountered: roomContent?.alchemistEncountered || false,
            bossesDefeated: roomContent?.bossesDefeated ? roomContent.bossesDefeated + matchVars.bossesDefeated : matchVars.bossesDefeated,
            minionEncounters: roomContent?.minionEncounters ? roomContent.minionEncounters + matchVars.bossesDefeated : matchVars.bossesDefeated,
        });
        setCanSearch(roomContent.canSearch);
        setCanTouchStatue(roomContent.canTouchStatue || false);
        setCanWaitReaction(roomContent.canWaitReaction || false);
        setReactionLog(roomContent.reaction || '');
    }

    function search() {
        setCanSearch(false);
    }

    function touchStatue() {
        setCanTouchStatue(false);
    }
    
    function waitReaction() {
        setCanWaitReaction(false);
        setLogs([...logs, reactionLog]);
    }

    return <div className="table-container">
        <h1>Tabla de {table.name}</h1>
        <div className="table-data">
            <div className="table-room-img">
                <h3>Tipo: {roomType === 'corridor' ? 'Corredor' : 'Habitacion'}</h3>
                <img src={cargarImagen(`./${table.tableRooms}/rooms/${roomImg}.png`)} alt={`room ${roomImg}`} />
            </div>
            <div className="table-room-content">
                <img src={cargarImagen(`./${table.tableRooms}/contents/${roomContentImg}`)} alt="room content" />
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
            {
                canTouchStatue ? <button onClick={touchStatue}>Tocar Estatua</button> : null
            }
            {
                canWaitReaction ? <button onClick={waitReaction}>Esperar reaccion</button> : null
            }
        </div>
    </div>
}

export default TableContainer;