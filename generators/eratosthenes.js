function eratosthenes(n) {
    // tablica jest indeksowana od 0, więc traktujemy że indeks 0 oznacza liczbę 2
    const numbers = new Array(n - 1).fill(true);
    const result = [];
    for (let i = 2; i <= n; i++) {
        if (!numbers[i - 2]) {
            // jeśli liczba nie jest pierwszą, przechodzimy dalej
            continue;
        }
        result.push(i);
        for (let j = i + i; j <= n; j += i) {
            // uznajemy wielokrotności za liczby złożone
            numbers[j - 2] = false;
        }
    }

    return result;
}

module.exports = eratosthenes;
