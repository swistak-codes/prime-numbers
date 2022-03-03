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

module.exports = factorize;
