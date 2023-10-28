let startTime;
let endTime;
let imageSize = "";
let image = new Image();
const boton = document.getElementById("btn");
const seccionLoading = document.getElementById("loading");
const spanMbsSpeed = document.getElementById("Mbs");
const spanKbsSpeed = document.getElementById("Kbs");
const bitsSpeed = document.getElementById("Bits");
let totalMbs = 0;
let totalKbs = 0;
let totalBits = 0;
let numTest = 4;
let testCompletado = 0;

let imageAPI = "https://source.unsplash.com/random?topic=nature";
image.onload = async function() {
    endTime = new Date().getTime();
    await fetch(imageAPI).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
}

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedinBits = loadedBits / timeDuration;
    let speedinKbs = speedinBits / 1024;
    let speedinMbs = speedinKbs / 1024;

    totalBits += speedinBits;
    totalKbs += speedinKbs;
    totalMbs += speedinMbs;

    testCompletado++;

    if (testCompletado === numTest) {
        let averageSpeedInBps = (totalBits / numTest).toFixed(2);
        let averageSpeedInKps = (totalKbs / numTest).toFixed(2);
        let averageSpeedInMps = (totalMbs / numTest).toFixed(2);

        bitsSpeed.innerHTML += `${averageSpeedInBps}`;
        spanKbsSpeed.innerHTML += `${averageSpeedInKps}`;
        spanMbsSpeed.innerHTML += `${averageSpeedInMps}`;
        seccionLoading.innerHTML = "Test Completado";
    } else {
        startTime = new Date().getTime();
        image.src = imageAPI;
    }
}

function resetValues() {
    totalMbs = 0;
    totalKbs = 0;
    totalBits = 0;
    testCompletado = 0;
    bitsSpeed.innerHTML = "";
    spanKbsSpeed.innerHTML = "";
    spanMbsSpeed.innerHTML = "";
}

const init = async () => {
    seccionLoading.innerHTML = "Comenzando Analisis..";
    startTime = new Date().getTime();
    image.src = imageAPI;
}

const realizarTest = () => {
    resetValues();
    for (let i = 0; i < numTest; i++) {
        init();
    }
}

window.onload = () => {
    realizarTest();
};

boton.addEventListener("click", () => {
    realizarTest();
});