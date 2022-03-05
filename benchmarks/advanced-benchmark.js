const fs = require("fs");
const benchmark = require("./benchmark");
const trial = require("../tests/trial-division-optimized2");
const fermat = require("../tests/fermat");
const millerRabin = require("../tests/miller-rabin");
const millerRabinDet = require("../tests/miller-rabin-deterministic");
const solovoyStrassen = require("../tests/solovay-strassen");

const primes = Object.values(require("../primes.json")).filter(
    (_, i) => i % 100 === 0
);

const functions = [
    trial,
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
    millerRabinDet,
];

const result = benchmark(functions, primes, 100);
const csv = result.map((x) => x.join(";")).join("\n");

fs.writeFileSync("./advanced-benchmark.csv", csv, "utf-8");
