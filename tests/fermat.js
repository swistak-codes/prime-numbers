const random = require("../helpers/random");
const modPow = require("../helpers/mod-pow");

function fermat(n, k) {
    // odrzucamy skrajne przypadki liczb pierwszych
    if (n === 2 || n === 3) return true;
    // odrzucamy liczby nieparzyste oraz mniejsze od 2
    if ((n & 1) === 0 || n < 2) return false;
    // powtarzamy k razy test bazujący na małym twierdzeniu Fermata
    for (let i = 0; i < k; i++) {
        // wybieramy losową podstawę z zakresu [2, n-2]
        const a = random(2, n - 2);
        // obliczamy a^(n-1) mod n
        let x = modPow(a, n - 1, n);
        // jeśli wynik jest różny od 1, to liczba jest złożona
        if (x !== 1) return false;
    }
    // jeśli ani razu nie trafiliśmy na świadka złożoności, liczba jest prawdopodobnie pierwsza
    return true;
}

module.exports = fermat;
