function sundaram(n) {
    // jeśli 2i + 1 wyznacza nam liczbę pierwszą, to jeśli za największą uznajemy n, to musimy odwrócić równanie aby wyznaczyć największą liczbę w liście
    const k = (n - 1) / 2;
    const numbers = new Array(n).fill(true);
    for (let i = 1; i <= k; i++) {
        let j = 1;
        let newNumber = i + j + 2 * i * j;
        while (newNumber <= k) {
            numbers[newNumber - 1] = false;
            j++;
            newNumber = i + j + 2 * i * j;
        }
    }
    const result = [];
    if (n > 2) {
        result.push(2);
    }
    for (let i = 1; i <= k; i++) {
        if (numbers[i - 1]) {
            result.push(2 * i + 1);
        }
    }
    return result;
}

module.exports = sundaram;

console.log(sundaram(100));
