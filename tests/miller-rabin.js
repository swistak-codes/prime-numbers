const random = require("../helpers/random");

function modPow(b, e, m) {
    // 1. Ustawiamy c = 1
    let c = 1;
    // 2. Obliczamy resztę z dzielenia podstawy przez moduł: b = b mod m
    b = b % m;
    // 3. Tak długo, jak wykładnik e jest większy od zera:
    while (e > 0) {
        // 3.1. Jeśli wykładnik jest nieparzysty, wtedy c = (c * b) mod m
        if ((e & 1) !== 0) {
            c = (c * b) % m;
        }
        // 3.2. Obliczamy nowy wykładnik: e = e/2 = e >> 1
        e = e >> 1;
        // 3.3. Liczymy nową podstawę: b = b^2 mod m
        b = b ** 2 % m;
    }
    // 4. Zwracamy wynik c.
    return c;
}

function factorize(x) {
    // 1. Ustawiamy s = 0 oraz d = x.
    let s = 0;
    let d = x;
    // 2. Dopóki d jest parzyste:
    while ((d & 1) === 0) {
        // 2.1. Podziel całkowitoliczbowo mnożnik przez 2
        d = Math.trunc(d / 2);
        // 2.2. Zwiększ s: s = s + 1;
        s++;
    }
    // 3. Zwróć s i d.
    return { s, d };
}

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
