import { dice } from "./diceRolls";

export const table1Corridors = ['11', '12', '13', '14', '26', '32', '33', '42', '45', '51', '53', '55', '62', '63', '65'];

export const roomContentTable1 = (roomType, vars) => {
    const roomContentRoll = dice(6) + dice(6);
    let log;
    let newVars;
    let result;
    let bossRoll;
    switch(roomContentRoll) {
        case 2: 
            result = treasureTable1(0);
            return {log: result.log, canSearch: false, img: result.img};
        case 3:
            result = treasureTable1(0);
            return {log: `Tesoro protegido por una trampa, trampa: ${trapsTable1()}, tesoro: ${result.log}.`, canSearch: false, img: result.img};
        case 4:
            if(roomType === 'corridor') {
                log = 'Habitacion vacia, puedes buscar.';
            } else {
                result = specialEventsTable1(vars?.healerEncountered, vars?.alchemistEncountered);
                log = `Evento especial: ${result.log}.`;
                newVars = result.vars;
            }
            return {log: log, canSearch: roomType === 'corridor', vars: newVars};
        case 5:
            result = specialFeatureTable1();
            return {log: `Habitacion vacia pero con caracteristica especial: ${result.log}, puedes buscar.`, canSearch: true, img: result.img, canTouchStatue: result.canTouchStatue};
        case 6:
            result = verminTable1();
            return {log: `¡Alimañas!: ${result.log}.`, canSearch: false, img: result.img, canWaitReaction: result.canWaitReaction, reaction: result.reaction};
        case 7:
            return {log: `¡Esbirros!: ${minionTable1()}.`, canSearch: false, img: result.img, reaction: result.reaction};
        case 8:
            if(roomType === 'corridor') {
                log = 'Habitacion vacia, puedes buscar.';
            } else {
                result = minionTable1();
                log = `¡Esbirros!: ${result.log}.`;
            }
            return {log: log, canSearch: roomType === 'corridor', vars: newVars, img: result.img, reaction: result.reaction};
        case 9:
            return {log: 'Habitacion vacia, puedes buscar.', canSearch: true};
        case 10:
            if(roomType === 'corridor') {
                log = 'Habitacion vacia, puedes buscar.';
            } else {
                result = weirdMonsterTable1();
                log = `¡Mounstro Extraño!: ${result.log}.`;
            }
            return {log: log, canSearch: roomType === 'corridor', vars: {bossesDefeated: 1}, img: result.img, reaction: result.reaction};
        case 11:
            if(roomType === 'corridor') {
                log = `¡Jefe!: .`;
            } else {
                bossRoll = dice(6) + vars.bossesDefeated;
                if (bossRoll >= 6) {
                    log = `¡Jefe final!: .`
                }else {
                    log = `¡Jefe!: ${minionTable1()}.`;
                }
            }
            return {log: log, canSearch: roomType === 'corridor', vars: newVars, img: result.img, reaction: result.reaction};
        case 12:
            if(roomType === 'corridor') {
                log = 'Habitacion vacia, puedes buscar.';
            } else {
                log = `¡Esbirros!: ${minionTable1()}.`;
            }
            return {log: log, canSearch: roomType === 'corridor', vars: newVars, img: result.img, reaction: result.reaction};
        default:
            break
    }
}

const treasureTable1 = (modifier) => {
    const roll = dice(6) + modifier;
    switch(roll) {
        case roll <= 0:
            return {log: 'no hay tesoro :(', img: 'treasure/nothing.webp'};
        case 1: 
            return {log: `${dice(6)} piezas de oro`, img: 'treasure/gold.jpg'};
        case 2:
            return {log: `${dice(6) + dice(6)} piezas de oro`, img: 'treasure/gold.jpg'};
        case 3:
            return {log: `un pergamino con el hechizo ${randomSpellTable1()}`, img: 'treasure/scroll.jpg'};
        case 4:
            return {log: `una gema con valor de ${(dice(6) + dice(6)) * 5} piezas de oro`, img: ''};
        case 5:
            return {log: `una pieza de joyeria con valor de ${(dice(6) + dice(6) + dice(6)) * 10} piezas de oro`, img: ''};
        case roll >= 6:
            return {log: `item magico: ${magicTreasureTable1()}`, img: ''};
        default:
    }
}

const magicTreasureTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Vara de sueño`;
        case 2:
            return `Anillo de teletransportacion`;
        case 3:
            return `Oro del bobo`;
        case 4:
            const roll1 = dice(6);
            let type;
            switch (roll1) {
                case 1:
                    type = 'arma ligera aplastante de 1 mano';
                    break
                case 2:
                    type = 'arma ligera cortante de 1 mano';
                    break
                case 3:
                    type = 'arma aplastante de 1 mano';
                    break
                case 4:
                    type = 'arma cortante de 1 mano';
                    break
                case 5:
                    type = 'arma cortante de 1 mano';
                    break
                case 6:
                    type = 'Arco';
                    break
                default:
            }
            return `${type} + 1 a las tiradas de ataque`;
        case 5:
            return `Pocion de curacion`;
        case 6:
            return `Baston de bola de fuego`;
        default:
    }
}

const randomSpellTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Bendecir`;
        case 2:
            return `Bola de fuego`;
        case 3:
            return `Rayo`;
        case 4:
            return `Dormir`;
        case 5:
            return `Escapar`;
        case 6:
            return `Protejer`;
        default:
    }
}

const trapsTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return `Un dardo (nivel 2) ataca al personaje en orden de marcha ${dice(4)}, debe realizar una tirada de defensa o perder 1 vida`;
        case 2:
            return `Gas venenoso (nivel 3) ataca a todos los jugadores, deben realizar una tirada de defensa ignorando cualquier escudo o armadura o perder 1 vida`;
        case 3:
            return `Una puerta trampa (nivel 4) se abre debajo del personaje que lidera el orden de marcha, debe realizar una tirada contra el nivel de la trampa (-1 si tiene armadura ligera, -2 armadura pesada, medianos o elfos +1), si el personaje esta solo se quedara en la trampa y morira`;
        case 4:
            return `Una trampa para osos (nivel 4) atapa al personaje que lidera el orden de marcha, debe realizar una tirada contra el nivel de la trampa (medianos y elfos +1, picaros +lvl) o perder 1 vida y la trampa quedara sujeta al pie, mientras no se cure la vida perdida tendra -1 en tiradas de ataque y defensa y -2 en tiradas contra otras trampas de oso o puertas trampa`;
        case 5:
            const char1 = dice(4);
            let char2 = dice(4);
            while(char2 === char1) {
                char2 = dice(4);
            }
            return `Lanzas salen de la pared (nivel 5) atacando a los personajes con orden de marcha ${char1} y ${char2}, deberan realizar una tirada de defensa contra el nivel de la trampa o perder una vida`;
        case 6:
            return `Un bloque de piedra gigante (nivel 5) cae sobre el ultimo personaje en orden de marcha, debera realizar una tirada de defensa o perder 2 vidas (el bonus de armadura cuenta, pero el de escudo no)`;
        default:
    }
}

const specialEventsTable1 = (healerEncountered = false, alchemistEncountered = false) => {
    let roll = dice(6);
    if(healerEncountered) {
        while(roll === 5) {
            roll = dice(6);
        }
    }
    if(alchemistEncountered && roll === 6) {
        roll = 4;
    }
    let vars = {};
    let result;
    switch(roll) {
        case 1: 
            return {log: `Un fantasma pasa a travez de los personajes, todos deben realizar una tirada contra nivel 4 de miedo o perder una vida (los clerigos agregan su nivel a la tirada)`};
        case 2:
            result = wanderingMonstersTable1();
            return {log: `Mounstros errantes atacan al grupo: ${result.log}`, img: result.img};
        case 3:
            return {log: `Una dama vestida de blanco les pide que completen la mision: {}, si la rechazan, la dama desaparecera y debes ignorar cualquier otra aparicion en esta partida`};
        case 4:
            return {log: `Hay una trampa en la habitacion: ${trapsTable1()}`};
        case 5:
            vars.healerEncountered = true;
            return {log: `Encuentran a un curandero errante puede curar un punto de vida a cambio de 10 de oro, no hay limite de curacion pero puede ser encontrado solo una vez.`, vars: vars};
        case 6:
            vars.alchemistEncountered = true;
            return {log: `
            Encuentran a un alquimista errante. Él te venderá hasta una poción de
            curación por miembro del grupo (50 piezas de oro cada una) o una dosis única de
            veneno de hoja (30 piezas de oro).  El veneno de hoja te permite envenenar a un
            una sola flecha o arma cortante (no un arma aplastante). esa arma
            Tendrás un +1 en Ataque contra el primer enemigo con el que luches. El veneno no
            funciona con monstruos no muertos, demonios, blobs, autómatas o estatuas vivas.
            Solo puede ser encontrado una vez`, vars: vars};
        default:
    }
}

const specialFeatureTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return {log: `¡Fuente!, todos los personajes heridos recuperan 1 punto de vida, solo la primer fuente que encuentres causara efecto, ignora las proximas fuentes`, img: ''};
        case 2:
            return {log: `¡Templo bendito!, un personaje de tu eleccion gana +1 en ataque contra enemigos no muertos y demonios, una vez el personaje mata un no muerto o demonio el bonus desaparece`, img: ''};
        case 3:
            return {log: `¡Armeria!, todos los personajes pueden cambiar su armamento si asi lo quieren, respetando las limitaciones de su clase`, img: ''};
        case 4:
            const marchOrder = dice(4);
            return {log: `Al entrar en la habitación, un brillo espeluznante emana de un
            altar siniestro. El personaje con orden de marcha ${marchOrder} está maldito y ahora tiene -1 en su
            Tiradas de defensa. Para romper la maldición, el personaje debe matar a un jefe
            monstruo solo, o entrar en un Templo Bendito (ver 2, arriba), o tener un
            Hechizo de bendición lanzado sobre sí mismo por un clérigo`, img: ''};
        case 5:
            return {log: `Ven una estatua en la habitacion, pueden dejarla sola o tocarla. (ve los botones debajo)`, img: '', canTouchStatue: true};
        case 6:
            const puzzleLevel = dice(6);
            return {log: `la habitación contiene una caja de rompecabezas. Su nivel es ${puzzleLevel}. Puedes
            Déjalo en paz o intenta resolverlo. Por cada intento fallido, el personaje
            intentar resolverlo pierde 1 vida. Magos y pícaros añaden su nivel a su
            tirada de resolución de acertijos. Si se resuelve el rompecabezas, se abre la caja y contiene dentro: ${treasureTable1().log}`, img: ''};
        default:
    }
}

const wanderingMonstersTable1 = () => {
    const roll = dice(6);
    const isWandering = true;
    switch(roll) {
        case roll <= 2: 
            return verminTable1(isWandering);
        case roll <= 4:
            return minionTable1(isWandering);
        case 5:
            return weirdMonsterTable1(isWandering);
        case 6:
            return bossTable1(isWandering);
        default:
    }
}

const verminTable1 = (isWandering = false) => {
    const roll = dice(6);
    const reactRoll = dice(6);
    const canWaitReaction = isWandering ? false : true;
    let reaction;
    switch(roll) {
        case 1:
            switch(reactRoll) {
                case reactRoll <= 3:
                    reaction = 'Escapar';
                    break
                case reactRoll >= 4:
                    reaction = 'Pelear';
                    break
                default:
            }
            return {log: `${dice(6) + dice(6) + dice(6)} ratas (nivel 1), sin tesoro. cada personaje herido por una rata tiene una probabilidad de 1 en 6 de sufrir una herida adicional por infeccion`, img: '', canWaitReaction, reaction};
        case 2:
            switch(reactRoll) {
                case reactRoll <= 3:
                    reaction = 'Escapar';
                    break
                case reactRoll >= 4:
                    reaction = 'Pelear';
                    break
                default:
            }
            return {log: `${dice(6) + dice(6) + dice(6)} murcielagos vampiro (nivel 1), sin tesoro. Los hechizos se lanzan a -1 debido a
            sus gritos que distraen. A pesar del apodo de Vampiro, estos son
            NO criaturas no muertas`, img: '', canWaitReaction, reaction};
        case 3:
            const goblins = dice(6) + dice(6);
            switch(reactRoll) {
                case 1:
                    reaction = 'Escapar';
                    break
                case reactRoll <= 3:
                    reaction = 'Escapan si son superados en numero';
                    break
                case 4:
                    reaction = `Los goblin piden ${5 * goblins} piezas de oro como soborno a cambio de dejarlos tranquilos`;
                    break
                case reactRoll >= 5:
                    reaction = `Luchan a muerte`;
                    break
                default:
            }
            return {log: `Enjambre de goblins ${goblins} (nivel 3), moral - 1. Los enanos atacan + 1. Tesoro si se los derrota: ${treasureTable1(-1).log}`, img: '', canWaitReaction, reaction};
        case 4:
            switch(reactRoll) {
                case 1:
                    reaction = 'Escapar';
                    break
                case reactRoll <= 3:
                    reaction = 'Escapan si son superados en numero';
                    break
                case reactRoll >= 4:
                    reaction = 'Pelear';
                    break
                default:
            }
            return {log: `${dice(6)} ciempiés gigantes, nivel 3, sin tesoro. Cualquier personaje herido
            por un ciempiés gigante debe salvar contra veneno de nivel 2 o perder 1
            vida adicional`, img: '', canWaitReaction, reaction};
        case 5:
            switch(reactRoll) {
                case 1:
                    reaction = 'Escapar';
                    break
                case reactRoll <= 4:
                    reaction = 'Pelear';
                    break
                case reactRoll >= 5:
                    reaction = 'Pelear a muerte';
                    break
                default:
            }
            return {log: `${dice(6)} ranas vampiro (nivel 4). A pesar del apodo de Vampiro,
            Estas no son criaturas no muertas. Tesoro si se los derrota: ${treasureTable1(-1).log}`, img: '', canWaitReaction, reaction};
        case 6:
            switch(reactRoll) {
                case reactRoll <= 2:
                    reaction = 'Escapar';
                    break
                case reactRoll >= 3:
                    reaction = 'pelear';
                    break
                default:
            }
            return {log: `${dice(6) + dice(6)} ratas esqueléticas, muertos vivientes (nivel 3), sin tesoro. Armas aplastantes
            tienen +1 contra ratas esqueléticas, pero no pueden ser atacadas.
            mediante arcos y hondas. Los clérigos añaden su nivel cuando los atacan porque
            son no-muertos.`, img: '', canWaitReaction, reaction};
        default:
    }
}

const minionTable1 = (isWandering = false) => {
    const roll = dice(6);
    const reactRoll = dice(6);
    const canWaitReaction = isWandering ? false : true;
    let reaction;
    switch(roll) {
        case 1: 
            return {log: ``, img: ''};
        case 2:
            return {log: ``, img: ''};
        case 3:
            return {log: ``, img: ''};
        case 4:
            return {log: ``, img: ''};
        case 5:
            return {log: ``, img: ''};
        case 6:
            return {log: ``, img: ''};
        default:
    }
}

const weirdMonsterTable1 = (isWandering = false) => {
    const roll = dice(6);
    const reactRoll = dice(6);
    const canWaitReaction = isWandering ? false : true;
    let reaction;
    switch(roll) {
        case 1: 
            return {log: ``, img: ''};
        case 2:
            return {log: ``, img: ''};
        case 3:
            return {log: ``, img: ''};
        case 4:
            return {log: ``, img: ''};
        case 5:
            return {log: ``, img: ''};
        case 6:
            return {log: ``, img: ''};
        default:
    }
}

const bossTable1 = (isWandering = false, isFinal) => {
    const roll = dice(6);
    const reactRoll = dice(6);
    const canWaitReaction = isWandering ? false : true;
    let reaction;
    switch(roll) {
        case 1: 
            return {log: ``, img: ''};
        case 2:
            return {log: ``, img: ''};
        case 3:
            return {log: ``, img: ''};
        case 4:
            return {log: ``, img: ''};
        case 5:
            return {log: ``, img: ''};
        case 6:
            return {log: ``, img: ''};
        default:
    }
}

export const searchTable1 = () => {
    const roll = dice(6);
    switch(roll) {
        case 1: 
            return {log: ``, img: ''};
        case roll <= 4:
            return {log: ``, img: ''};
        case roll >= 5:
        default:
    }
}