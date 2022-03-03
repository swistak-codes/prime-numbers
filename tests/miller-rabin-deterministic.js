const modPow = require("../helpers/mod-pow");
const factorize = require("../helpers/factorize");

function getBases(n) {
    // źródło: https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Testing_against_small_sets_of_bases
    if (n < 2047) return [2];
    if (n < 1373653) return [2, 3];
    if (n < 9080191) return [31, 73];
    if (n < 25326001) return [2, 3, 5];
    if (n < 3215031751) return [2, 3, 5, 7];
    if (n < 4759123141) return [2, 7, 61];
    if (n < 1122004669633) return [2, 13, 23, 1662803];
    if (n < 2152302898747) return [2, 3, 5, 7, 11];
    if (n < 3474749660383) return [2, 3, 5, 7, 11, 13];
    if (n < 341550071728321) return [2, 3, 5, 7, 11, 13, 17];
    return [2, 3, 5, 7, 11, 13, 17, 19, 23];
}

function millerRabinDeterministic(n) {
    if (n === 2 || n === 3) return true;
    if ((n & 1) === 0 || n < 2) return false;
    const { s, d } = factorize(n - 1);
    for (const a of getBases(n)) {
        let x = modPow(a, d, n);
        if (x === 1 || x === n - 1) continue;
        let isPrime = false;
        for (let r = 1; r < s; r++) {
            x = modPow(x, 2, n);
            if (x === 1) return false;
            if (x === n - 1) {
                isPrime = true;
                break;
            }
        }
        if (isPrime) {
            continue;
        }
        return false;
    }
    return true;
}

module.exports = millerRabinDeterministic;
