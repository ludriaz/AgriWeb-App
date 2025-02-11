'use strict'
document.addEventListener("DOMContentLoaded", inicio)

function inicio() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    const result = document.getElementById('result');
    const captureButton = document.getElementById('capture');

    const fileInput = document.getElementById('fileInput');
    const insertButton = document.getElementById('insertButton');

    const ctx = canvas.getContext('2d');
    
    async function setupCamera() {
        // Solicitar acceso a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    }
    
    async function loadModelAndPredict(image) {
        result.textContent = 'Cargando modelo...';
        // Cargar MobileNet
        const model = await mobilenet.load();
    
        // Realizar predicción
        const predictions = await model.classify(image);
    
        // Buscar si "perro" está en la clasificación
        const isDog = predictions.some(pred => pred.className.toLowerCase().includes('dog'));
    
        if (isDog) {
            result.textContent = '¡Es un perro! 🐶';
        } else {
            result.textContent = 'No es un perro. 🚫';
        }
    }
    
    captureButton.addEventListener('click', () => {
        // Ajustar el tamaño del canvas al tamaño del video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    
        // Dibujar la imagen capturada en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        // Usar el canvas como entrada para el modelo
        loadModelAndPredict(canvas);
    });
    
    ////////

    let movil = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        any: function() {
            return (movil.Android() || movil.iOS());
        }
    };
    
    if (movil.any()) {
        
        console.log("Contenido de para movil");

        let cambiarCamara = document.createElement("button")
        cambiarCamara.textContent = "Cámara trasera"
        
        document.getElementById("buttonContainer").appendChild(cambiarCamara)

        cambiarCamara.addEventListener("click", (e) => {
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { exact: 'environment'}
                }
            }).then(function(stream) {
                video.srcObject = stream;
            }).catch(function(error) {
                alert("Error con la camara: " + error);
            })
        })
    }
    

    insertButton.addEventListener("click", () => {
        fileInput.click();
    })

    fileInput.addEventListener("change", (e) => {
        if (fileInput.files[0].type.includes("image/")) {
            
            let file = fileInput.files[0]
            let reader = new FileReader()
            reader.onload = function(event) {
                let img = new Image()
                img.src = event.target.result
                img.onload = function() {
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
            reader.readAsDataURL(file)
            loadModelAndPredict(canvas)

        } else {
            console.log("Imagen invalida");
        }
    })

    // Inicializar la cámara al cargar la página
    setupCamera();
}


