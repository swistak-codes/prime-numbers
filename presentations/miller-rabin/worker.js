import random from "../../helpers/random";
import millerRabin from "../../tests/miller-rabin";

const calculateRepeatsCount = (bits) => {
    return Math.ceil(Math.log2(bits / 1.443));
};

const generatePrime = function (bits) {
    // obliczamy potrzebną liczbę powtórzeń testu
    const k = calculateRepeatsCount(bits);
    // licznik prób
    let tries = 0;
    // powtarzamy aż do skutku
    while (true) {
        // podnosimy licznik prób
        tries++;
        // losujemy liczbę o wskazanej liczbie bitów;
        // z racji tego, jak działa generator liczb pseudolosowych w JS, ograniczamy tylko od góry
        const n = random(
            5,
            bits === 53 ? Number.MAX_SAFE_INTEGER : 2 ** bits - 1
        );
        // sprawdzamy, czy liczba jest pierwsza
        const result = millerRabin(Number(n), k);
        if (result) {
            // jeśli jest pierwsza, zakończmy działanie
            return {
                tries,
                number: n,
            };
        }
    }
};

onmessage = (e) => {
    // odbieramy żądanie z wątku UI i obliczamy wynik
    const result = generatePrime(e.data);
    // przesyłamy wynik z powrotem na wątek UI
    postMessage(result);
};
