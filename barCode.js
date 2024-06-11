const quaggaConf = {
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#camera"),
        constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 }
        }
    },
    decoder: {
        readers: ['code_128_reader']
    },
};

const startCamera = () => {
    document.getElementById("camera").style.display = "block";
    Quagga.init(quaggaConf, function (err) {
        if (err) {
            return console.log(err);
        }
        Quagga.start();
    });
};

document.getElementById("start-camera").addEventListener("click", startCamera);

Quagga.onDetected(function (result) {
    const code = result.codeResult.code;
    document.getElementById('barcode').value = code;
    Quagga.stop();
    document.getElementById("camera").style.display = "none";
});
