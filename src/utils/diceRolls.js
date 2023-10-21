export function dice(d) {
    return Math.floor(Math.random() * d) + 1;
}

export function xInXChance(a, b) {
    return Math.floor(Math.random() * b) + 1 <= a;
}