const random = require("../helpers/random");
const modPow = require("../helpers/mod-pow");
const factorize = require("../helpers/factorize");

function millerRabin(n, k) {
    // 1. Odrzućmy dwa skrajne przypadki: 2 i 3
    if (n === 2 || n === 3) return true;
    // 2. Odrzućmy wszystkie liczby parzyste i mniejsze od 2
    if ((n & 1) === 0 || n < 2) return false;
    // 3. Oblicz wartości s i d ze wzoru 2^s * d = n - 1
    const { s, d } = factorize(n - 1);
    // 4. Powtórz k razy:
    for (let i = 0; i < k; i++) {
        // 4.1. Wybierz losową liczbę a z zakresu (1, n-1)
        const a = random(2, n - 2);
        // 4.2. Oblicz x = a^d mod n
        let x = modPow(a, d, n);
        // 4.3. Jeśli x = 1 lub x = n-1 zakończ aktualny przebieg pętli i wykonaj kolejny
        if (x === 1 || x === n - 1) continue;
        // 4.4. Dla wszystkich r od 1 do s-1
        let isPrime = false;
        for (let r = 1; r < s; r++) {
            // 4.4.1. Oblicz x = x^2 mod n
            x = modPow(x, 2, n);
            // 4.4.2. Jeśli x = 1 zakończ algorytm i zwróć fałsz
            if (x === 1) return false;
            // 4.4.3. Jeśli x = n-1, liczba jest prawdopodonie pierwsza
            if (x === n - 1) {
                isPrime = true;
                break;
            }
        }
        if (isPrime) {
            continue;
        }
        // 4.5. Liczba nie spełnia warunków, więc jest złożona
        return false;
    }
    // 5. Liczba jest prawdopodobnie pierwsza
    return true;
}

module.exports = millerRabin;
