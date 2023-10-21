import { dice } from "./diceRolls";

export const roomContentTable1 = (roomType) => {
    const roomContentRoll = dice(6) + dice(6);
    switch(roomContentRoll) {
        case 2: 
            return {log: `Tesoro encontrado: ${treasureTable1()}`, canSearch: false}
        case 3:
            return {log: `Tesoro protegido por una trampa, trampa: ${trapsTable1()}, tesoro: ${treasureTable1()}`, canSearch: false}
        case 4:
            let log;
            if(roomType === 'corridor') {
                log = 'Habitacion vacia, puedes buscar'
            } else {
                log = `Evento especial: ${specialEventsTable1()}`
            }
            return {log: log, canSearch: roomType === 'corridor'}
        default:
    }
}

const treasureTable1 = (modifier) => {
    const roll = dice(6) + modifier;
    switch(roll) {
        case roll <= 0:
            return 'no hay tesoro :('
        case 1: 
            return `${dice(6)} piezas de oro`
        case 2:
            return `${dice(6) + dice(6)} piezas de oro`
        case 3:
            return `un pergamino con el hechizo ${randomSpellTable1()}`
        case 4:
            return `una gema con valor de ${(dice(6) + dice(6)) * 5} piezas de oro`
        case 5:
            return `una pieza de joyeria con valor de ${(dice(6) + dice(6) + dice(6)) * 10} piezas de oro`
        case roll >= 6:
            return `item magico: ${magicTreasureTable1()}`
        default:
    }
}

const magicTreasureTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Vara de sueño`
        case 2:
            return `Anillo de teletransportacion`
        case 3:
            return `Oro del bobo`
        case 4:
            const roll1 = dice(6);
            let type;
            switch (roll1) {
                case 1:
                    type = 'arma ligera aplastante de 1 mano'
                    break
                case 2:
                    type = 'arma ligera cortante de 1 mano'
                    break
                case 3:
                    type = 'arma aplastante de 1 mano'
                    break
                case 4:
                    type = 'arma cortante de 1 mano'
                    break
                case 5:
                    type = 'arma cortante de 1 mano'
                    break
                case 6:
                    type = 'Arco'
                    break
                default:
            }
            return `${type} + 1 a las tiradas de ataque`
        case 5:
            return `Pocion de curacion`
        case 6:
            return `Baston de bola de fuego`
        default:
    }
}

const randomSpellTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Bendecir`
        case 2:
            return `Bola de fuego`
        case 3:
            return `Rayo`
        case 4:
            return `Dormir`
        case 5:
            return `Escapar`
        case 6:
            return `Protejer`
        default:
    }
}

const trapsTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Un dardo (nivel 2) ataca al personaje en orden de marcha ${dice(4)}, debe realizar una tirada de defensa o perder 1 vida`
        case 2:
            return `Gas venenoso (nivel 3) ataca a todos los jugadores, deben realizar una tirada de defensa ignorando cualquier escudo o armadura o perder 1 vida`
        case 3:
            return `Una puerta trampa (nivel 4) se abre debajo del personaje que lidera el orden de marcha, debe realizar una tirada contra el nivel de la trampa (-1 si tiene armadura ligera, -2 armadura pesada, medianos o elfos +1), si el personaje esta solo se quedara en la trampa y morira`
        case 4:
            return `Una trampa para osos (nivel 4) atapa al personaje que lidera el orden de marcha, debe realizar una tirada contra el nivel de la trampa (medianos y elfos +1, picaros +lvl) o perder 1 vida y la trampa agarrada al pie, mientras no se cure la vida perdida tendra -1 en tiradas de ataque y defensa y -2 en tiradas contra otras trampas de oso o puertas trampa`
        case 5:
            const char1 = dice(4);
            let char2 = dice(4);
            while(char2 === char1) {
                char2 = dice(4);
            }
            return `Lanzas salen de la pared (nivel 5) atacando a los personajes con orden de marcha ${char1} y ${char2}, deberan realizar una tirada de defensa contra el nivel de la trampa o perder una vida`
        case 6:
            return `Un bloque de piedra gigante (nivel 5) cae sobre el ultimo personaje en orden de marcha, debera realizar una tirada de defensa o perder 2 vidas (el bonus de armadura cuenta, pero el de escudo no)`
        default:
    }
}

const specialEventsTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Un fantasma pasa a travez de los personajes, todos deben realizar una tirada contra nivel 4 de miedo o perder una vida (los clerigos agregan su nivel a la tirada)`
        case 2:
            return `Bola de fuego`
        case 3:
            return `Rayo`
        case 4:
            return `Dormir`
        case 5:
            return `Escapar`
        case 6:
            return `Protejer`
        default:
    }
}