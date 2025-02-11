// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

/*
Explicación de los métodos de Firebase usados:
- initializeApp(firebaseConfig): Inicializa la aplicación Firebase con la configuración proporcionada.
- getAuth(app): Obtiene el servicio de autenticación de Firebase asociado a la aplicación.
- signInWithEmailAndPassword(auth, correo, contraseña): Permite a un usuario autenticarse con su correo y contraseña.
- createUserWithEmailAndPassword(auth, correo, contraseña): Crea un nuevo usuario en Firebase con correo y contraseña.
- sendPasswordResetEmail(auth, correo): Envía un correo de recuperación de contraseña al usuario si el correo ingresado es válido.
*/

// Configuración de Firebase: proporciona las credenciales necesarias para conectar la aplicación con Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyC-aoCxcFhE2nDN8xtqOUXvJgPBStJ_-uY", // API Key
    authDomain: "autentificacion-email-pass.firebaseapp.com", // Dominio de autenticación
    projectId: "autentificacion-email-pass", // ID del proyecto en Firebase
    storageBucket: "autentificacion-email-pass.firebasestorage.app", // Bucket para almacenamiento
    messagingSenderId: "56094586528", // Sender ID para mensajes
    appId: "1:56094586528:web:e22bbc0b2c2c4ffcf73bc5", // ID de la aplicación
    measurementId: "G-966J7BSHRB" // ID de medición
};

// Este evento espera a que el contenido del DOM se haya cargado completamente antes de ejecutar la inicialización de la aplicación.
document.addEventListener('DOMContentLoaded', inicio);

// Función principal que inicia la aplicación, y es llamada cuando el DOM está listo.
function inicio() {
    dibujarPagina(); // Dibuja los elementos HTML dinámicamente
    inicializarFirebase(); // Configura Firebase y la autenticación
    configurarEventos(); // Añade los eventos a los botones y formularios
}

// Función que genera dinámicamente la interfaz de usuario (UI) de la página de autenticación.
function dibujarPagina() {
    // Título de la página
    let titulo = document.createElement("h1");
    titulo.innerHTML = "Autenticación con Firebase";

    // Contenedor para mensajes que se mostrarán al usuario (como éxito o error)
    let contenedorMensaje = document.createElement("div");
    contenedorMensaje.id = "mensaje"; // Asigna un ID para manipularlo más fácilmente
    contenedorMensaje.style = "display: none; text-align: center; margin-top: 10px;"; // Estilo oculto inicialmente

    // Formulario de inicio de sesión
    let formulario = document.createElement("form");
    formulario.id = "formularioInicioSesion";

    // Campos de entrada de correo electrónico
    let etiquetaCorreo = document.createElement("label");
    etiquetaCorreo.for = "correo";
    etiquetaCorreo.innerHTML = "Correo electrónico:";
    
    let entradaCorreo = document.createElement("input");
    entradaCorreo.type = "email";
    entradaCorreo.id = "correo";
    entradaCorreo.name = "correo";
    entradaCorreo.required = true; // Requiere que se ingrese el correo

    // Campos de entrada de contraseña
    let etiquetaContraseña = document.createElement("label");
    etiquetaContraseña.for = "contraseña";
    etiquetaContraseña.innerHTML = "Contraseña:";
    
    let entradaContraseña = document.createElement("input");
    entradaContraseña.type = "password";
    entradaContraseña.id = "contraseña";
    entradaContraseña.name = "contraseña";
    entradaContraseña.required = true; // Requiere que se ingrese una contraseña

    // Botón para enviar el formulario de inicio de sesión
    let botonInicioSesion = document.createElement("button");
    botonInicioSesion.type = "submit";
    botonInicioSesion.innerHTML = "Iniciar sesión";
    
    // Botón para ir a la página de registro
    let botonRegistro = document.createElement("button");
    botonRegistro.type = "button";
    botonRegistro.id = "botonRegistro";
    botonRegistro.innerHTML = "Registrarse";
    
    // Botón para recuperar la contraseña en caso de olvido
    let botonRecuperarContraseña = document.createElement("button");
    botonRecuperarContraseña.type = "button";
    botonRecuperarContraseña.id = "botonRecuperarContraseña";
    botonRecuperarContraseña.innerHTML = "¿Olvidaste tu contraseña?";

    // Organiza los elementos en el formulario y los agrega al documento
    formulario.append(
        etiquetaCorreo, entradaCorreo, document.createElement("br"),
        etiquetaContraseña, entradaContraseña, document.createElement("br"),
        botonInicioSesion, botonRegistro, botonRecuperarContraseña
    );

    // Agrega el título, el contenedor de mensajes y el formulario al cuerpo del documento.
    document.body.append(titulo, contenedorMensaje, formulario);
}

// Inicializa Firebase y obtiene la instancia de autenticación
function inicializarFirebase() {
    // Inicializa la aplicación con la configuración de Firebase proporcionada
    const app = initializeApp(firebaseConfig);
    // Obtiene la instancia de autenticación
    window.auth = getAuth(app);
}

// Configura los eventos de los botones y formularios de la interfaz.
function configurarEventos() {
    // Obtiene el formulario de inicio de sesión y los botones de la página
    const formularioInicioSesion = document.getElementById('formularioInicioSesion');
    const contenedorMensaje = document.getElementById('mensaje');
    const botonRegistro = document.getElementById('botonRegistro');
    const botonRecuperarContraseña = document.getElementById('botonRecuperarContraseña');
    
    // Evento de envío del formulario de inicio de sesión
    formularioInicioSesion.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario
        const correo = document.getElementById('correo').value; // Obtiene el correo del formulario
        const contraseña = document.getElementById('contraseña').value; // Obtiene la contraseña del formulario
        
        try {
            // Intenta autenticar al usuario con correo y contraseña usando Firebase
            const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
            contenedorMensaje.style.display = 'block'; // Muestra el contenedor de mensaje
            contenedorMensaje.textContent = 'Inicio de sesión exitoso'; // Mensaje de éxito
            contenedorMensaje.style.color = 'green'; // Cambia el color del mensaje a verde
            console.log('Usuario:', userCredential.user.email); // Muestra el correo del usuario en consola
        } catch (error) {
            // Si ocurre un error, muestra un mensaje de error
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Error en el inicio de sesión: ' + error.message;
            contenedorMensaje.style.color = 'red'; // Cambia el color del mensaje a rojo
        }
    });

    // Evento de clic en el botón de registro
    botonRegistro.addEventListener('click', async () => {
        const correo = document.getElementById('correo').value; // Obtiene el correo
        const contraseña = document.getElementById('contraseña').value; // Obtiene la contraseña
        
        // Verifica si el correo y la contraseña están vacíos
        if (!correo || !contraseña) {
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Por favor, ingresa un correo y una contraseña para registrarte.';
            contenedorMensaje.style.color = 'red'; // Muestra un mensaje de error si faltan datos
            return;
        }

        try {
            // Intenta registrar un nuevo usuario con el correo y la contraseña proporcionados
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Registro exitoso. ¡Bienvenido!'; // Mensaje de éxito
            contenedorMensaje.style.color = 'green'; // Cambia el color del mensaje a verde
        } catch (error) {
            // Si ocurre un error, muestra un mensaje de error
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Error en el registro: ' + error.message;
            contenedorMensaje.style.color = 'red'; // Cambia el color del mensaje a rojo
        }
    });

    // Evento de clic en el botón de recuperar contraseña
    botonRecuperarContraseña.addEventListener('click', async () => {
        const correo = document.getElementById('correo').value; // Obtiene el correo
        
        // Verifica si el correo está vacío
        if (!correo) {
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Por favor, ingresa tu correo para recuperar la contraseña.';
            contenedorMensaje.style.color = 'red'; // Muestra un mensaje de error si falta el correo
            return;
        }

        try {
            // Envía un correo de recuperación de contraseña a la dirección proporcionada
            await sendPasswordResetEmail(auth, correo);
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Correo de recuperación enviado.'; // Mensaje de éxito
            contenedorMensaje.style.color = 'green'; // Cambia el color del mensaje a verde
        } catch (error) {
            // Si ocurre un error, muestra un mensaje de error
            contenedorMensaje.style.display = 'block';
            contenedorMensaje.textContent = 'Error al enviar correo de recuperación: ' + error.message;
            contenedorMensaje.style.color = 'red'; // Cambia el color del mensaje a rojo
        }
    });
}
