const fs = require("fs");
const trial = require("../tests/trial-division-optimized2");
const fermat = require("../tests/fermat");
const millerRabin = require("../tests/miller-rabin");
const millerRabinDet = require("../tests/miller-rabin-deterministic");
const solovoyStrassen = require("../tests/solovay-strassen");

const numbers = Array.from({ length: 999998 })
    .map((_, i) => i + 2)
    .filter((x) => x % 2 !== 0);

const functions = [
    (n) => fermat(n, 1),
    (n) => fermat(n, 5),
    (n) => fermat(n, 10),
    (n) => fermat(n, 100),
    (n) => millerRabin(n, 1),
    (n) => millerRabin(n, 5),
    (n) => millerRabin(n, 10),
    (n) => millerRabin(n, 100),
    (n) => solovoyStrassen(n, 1),
    (n) => solovoyStrassen(n, 5),
    (n) => solovoyStrassen(n, 10),
    (n) => solovoyStrassen(n, 100),
];

const result = [];
for (const number of numbers) {
    const isPrime = trial(number);
    console.log(number, isPrime);
    const line = [number];
    const errors = new Map();
    for (let i = 0; i < 100; i++) {
        for (const func of functions) {
            let sum = errors.get(func) || 0;
            const isProbablePrime = func(number);
            if (isProbablePrime !== isPrime) {
                sum += 1;
            }
            errors.set(func, sum);
        }
    }
    const isProbableDet = millerRabinDet(number);
    errors.set(millerRabinDet, isProbableDet !== isPrime ? 1 : 0);
    for (const func of functions) {
        const sum = errors.get(func);
        line.push(sum);
    }
    line.push(errors.get(millerRabinDet));

    result.push(line);
}

const csv = result.map((x) => x.join(";")).join("\n");
fs.writeFileSync("./errors-counter.csv", csv, "utf-8");
