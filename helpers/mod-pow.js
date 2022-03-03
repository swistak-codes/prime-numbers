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

module.exports = modPow;
