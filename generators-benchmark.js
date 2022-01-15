const fs = require("fs");
const benchmark = require("./benchmark");
const functions = [
    require("./generators/naive"),
    require("./generators/eratosthenes"),
    require("./generators/sundaram"),
];

const limits = Array.from(Array(1000).keys()).map((x) => 100 * (x + 1));
limits.unshift(1, 2, 10, 25, 50);

const result = benchmark(functions, limits, 50);
const csv = result.map((x) => x.join(";")).join("\n");

fs.writeFileSync("./generators-benchmark.csv", csv, "utf-8");
