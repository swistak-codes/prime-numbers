const random = require("../helpers/random");
const modPow = require("../helpers/mod-pow");

function modulo(a, b) {
    let r = a % b;
    if (r < 0) {
        if (b > 0) {
            r = r + b;
        } else {
            r = r - b;
        }
    }
    return r;
}

/**
 * Funkcja obliczająca symbol Jacobiego
 * @param a
 * @param n
 * @returns {number}
 */
function jacobi(a, n) {
    if (n <= 0 || n % 2 === 0) return 0;
    let result = 1;
    if (a < 0) {
        a = -a;
        if (n % 4 === 3) {
            result = -result;
        }
    }
    if (a === 1) return result;
    while (a !== 0) {
        if (a < 0) {
            a = -a;
            if (n % 4 === 3) {
                result = -result;
            }
        }
        while (a % 2 === 0) {
            a = Math.trunc(a / 2);
            if (n % 8 === 3 || n % 8 === 5) {
                result = -result;
            }
        }
        [a, n] = [n, a];
        if (a % 4 === 3 && n % 4 === 3) {
            result = -result;
        }
        a %= n;
        if (a > Math.trunc(n / 2)) {
            a = a - n;
        }
    }
    return n === 1 ? result : 0;
}

function solovayStrassen(n, k) {
    // odrzucamy skrajne przypadki liczb pierwszych
    if (n === 2 || n === 3) return true;
    // odrzucamy liczby nieparzyste oraz mniejsze od 2
    if ((n & 1) === 0 || n < 2) return false;
    // powtarzamy k razy test Solovoya-Strassena
    for (let i = 0; i < k; i++) {
        // wybieramy losową liczbę z zakresu [2, n-1]
        const a = random(2, n - 1);
        // liczymy symbol Jacobiego dla a i n
        const x = jacobi(a, n);
        // jeżeli wynosi 0, liczba jest złożona
        if (x === 0) {
            return false;
        }
        // obliczamy a^((n-1)/2) mod n
        const mod = modPow(a, (n - 1) / 2, n);
        // jeżeli jest różny od wartości x, liczba jest złożona
        if (mod !== modulo(x, n)) {
            return false;
        }
    }
    // jeśli ani razu nie stwierdziliśmy, że liczba jest złożona, to jest prawdopodobnie pierwsza
    return true;
}

module.exports = solovayStrassen;
