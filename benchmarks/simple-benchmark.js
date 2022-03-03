const fs = require("fs");
const benchmark = require("./benchmark");
const functions = [
    require("../tests/trial-division"),
    require("../tests/trial-division-optimized1"),
    require("../tests/trial-division-optimized2"),
];
const primes = Object.values(require("../primes.json")).filter(
    (_, i) => i % 100 === 0
);

const result = benchmark(functions, primes, 10);
const csv = result.map((x) => x.join(";")).join("\n");

fs.writeFileSync("./simple-benchmark.csv", csv, "utf-8");
