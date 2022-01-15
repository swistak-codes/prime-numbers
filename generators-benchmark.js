const fs = require("fs");
const benchmark = require("./benchmark");
const functions = [
    require("./generators/naive"),
    require("./generators/eratosthenes"),
    require("./generators/sundaram"),
];

const limits = Array.from(Array(26).keys()).map((x) => 2 ** x);

const result = benchmark(functions, limits, 20);
const csv = result.map((x) => x.join(";")).join("\n");

fs.writeFileSync("./generators-benchmark.csv", csv, "utf-8");
