function benchmark(functions, inputs, tries) {
    const result = [];
    for (const input of inputs) {
        console.log(input);
        const line = [input];
        for (const func of functions) {
            let sum = 0;
            for (let i = 0; i < tries; i++) {
                console.log(i);
                const startTime = process.hrtime();
                func(input);
                const endTime = process.hrtime(startTime);
                sum += endTime[0] * 1000000 + endTime[1];
            }
            line.push(sum / tries);
        }
        result.push(line);
    }
    return result;
}

module.exports = benchmark;
