function benchmark(functions, inputs, tries) {
    const result = [];
    for (const input of inputs) {
        console.log(input);
        const line = [input];
        const sums = new Map();
        for (let i = 0; i < tries; i++) {
            for (const func of functions) {
                let sum = sums.get(func) || 0n;
                console.log(i);
                const startTime = process.hrtime.bigint();
                func(input);
                const endTime = process.hrtime.bigint();
                sum += endTime - startTime;
                sums.set(func, sum);
            }
        }
        for (const func of functions) {
            const sum = sums.get(func);
            line.push(sum / BigInt(tries));
        }

        result.push(line);
    }
    return result;
}

module.exports = benchmark;
