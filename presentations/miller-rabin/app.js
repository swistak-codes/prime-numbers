const bitsInput = document.getElementById("bits");
const startButton = document.getElementById("start");
const triesSpan = document.getElementById("tries");
const numberDiv = document.getElementById("number");
const primeDiv = document.getElementById("prime");
const loaderDiv = document.getElementById("loader");
const abortButton = document.getElementById("abort");

primeDiv.style.display = "none";
loaderDiv.style.display = "none";
abortButton.style.display = "none";

startButton.addEventListener("click", () => {
    // ograniczenie 53 bity wynika z tego, że korzystamy z JSowego Number
    const bits = Math.min(53, Math.max(bitsInput.valueAsNumber, 2));
    triesSpan.textContent = "-";
    numberDiv.style.display = "none";
    primeDiv.style.display = "none";
    loaderDiv.style.display = "block";
    abortButton.style.display = "block";
    startButton.disabled = true;

    // tworzymy oddzielny wątek z generatorem liczb
    const worker = new Worker(new URL("worker.js", import.meta.url), {
        type: "module",
    });

    // ustawiamy akcję przerwania wątku na odpowiedni przycisk
    const terminateWorker = () => {
        worker.terminate();
        numberDiv.textContent = "-";
        numberDiv.style.display = "block";
        loaderDiv.style.display = "none";
        abortButton.style.display = "none";
        abortButton.removeEventListener("click", terminateWorker);
        startButton.disabled = false;
    };
    abortButton.addEventListener("click", terminateWorker);

    // przesyłamy żądanie do wątku
    worker.postMessage(bits);

    // obsługa odebrania rezultatu z wątku
    worker.onmessage = (e) => {
        triesSpan.textContent = e.data.tries.toString();
        numberDiv.textContent = e.data.number.toString();
        primeDiv.style.display = "block";
        numberDiv.style.display = "block";
        loaderDiv.style.display = "none";
        abortButton.style.display = "none";
        abortButton.removeEventListener("click", terminateWorker);
        startButton.disabled = false;
    };
});
