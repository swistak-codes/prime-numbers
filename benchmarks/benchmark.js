function removeMaxAndMin(array) {
    let min = null;
    let max = null;
    let minI = null;
    let maxI = null;
    for (let i = 0; i < array.length; i++) {
        const val = array[i];
        if (min === null || val < min) {
            min = val;
            minI = i;
        }
        if (max === null || val > max) {
            max = val;
            maxI = i;
        }
    }

    return array.filter((_, i) => i !== minI && i !== maxI);
}

function benchmark(functions, inputs, tries) {
    const result = [];
    for (const input of inputs) {
        console.log(input);
        const line = [input];
        const sums = new Map();
        for (let i = 0; i < tries; i++) {
            for (const func of functions) {
                let sum = sums.get(func) || [];
                const startTime = process.hrtime.bigint();
                func(input);
                const endTime = process.hrtime.bigint();
                sum.push(endTime - startTime);
                sums.set(func, sum);
            }
        }
        for (const func of functions) {
            const sum = removeMaxAndMin(sums.get(func)).reduce((a, b) => a + b);
            line.push(sum / BigInt(tries));
        }

        result.push(line);
    }
    return result;
}

module.exports = benchmark;
