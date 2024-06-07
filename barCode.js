document.addEventListener("DOMContentLoaded", function () {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        // Inicializar Quagga
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'), // El contenedor para la cámara
                constraints: {
                    facingMode: "environment" // Usar la cámara trasera si está disponible
                }
            },
            decoder: {
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onDetected(function (data) {
            const code = data.codeResult.code;
            document.getElementById('result').innerText = `Código detectado: ${code}`;
            // Detener la captura de video una vez que se haya detectado un código
            Quagga.stop();
        });
    } else {
        console.log("getUserMedia not supported");
    }
});
