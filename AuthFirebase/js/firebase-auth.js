// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js"; // Inicializa la app de Firebase
import { 
    getAuth, // Obtiene el servicio de autenticación de Firebase
    signInWithEmailAndPassword, // Método para iniciar sesión con correo y contraseña
    createUserWithEmailAndPassword, // Método para registrar un nuevo usuario con correo y contraseña
    sendPasswordResetEmail //Método para mandar un email de recuperación de contraseña
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Configuración de Firebase
// Estos son los datos necesarios para conectar la aplicación a tu proyecto en Firebase.
// Puedes obtener esta configuración en el panel de Firebase de tu proyecto.
const firebaseConfig = {
    apiKey: "AIzaSyC-aoCxcFhE2nDN8xtqOUXvJgPBStJ_-uY", // Clave API para autenticar solicitudes
    authDomain: "autentificacion-email-pass.firebaseapp.com", // Dominio de autenticación
    projectId: "autentificacion-email-pass", // ID único del proyecto
    storageBucket: "autentificacion-email-pass.firebasestorage.app", // URL del bucket de almacenamiento
    messagingSenderId: "56094586528", // ID del remitente para mensajes push
    appId: "1:56094586528:web:e22bbc0b2c2c4ffcf73bc5", // ID de la app
    measurementId: "G-966J7BSHRB" // ID para Google Analytics
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig); // Inicializa la aplicación con la configuración de Firebase
const auth = getAuth(app); // Obtiene la instancia del servicio de autenticación

// Captura los elementos del DOM
const loginForm = document.getElementById('loginForm'); // Formulario de inicio de sesión
const messageContainer = document.getElementById('message'); // Contenedor para mostrar mensajes (éxito/error)
const registerButton = document.getElementById('registerButton'); // Botón de registro
const forgetPasswordButton = document.getElementById('forgetPasswordButton'); //Botón de olvido de contraseña

// Manejo del formulario de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Obtén los valores de los campos del formulario
    const email = document.getElementById('email').value; // Valor del correo electrónico
    const password = document.getElementById('password').value; // Valor de la contraseña

    try {
        // Intenta iniciar sesión con el método de Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Si tiene éxito, muestra un mensaje de éxito
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Inicio de sesión exitoso';
        messageContainer.style.color = 'green'; // Color verde para mensajes de éxito
        console.log('Usuario:', userCredential.user.email); // Imprime el correo del usuario en la consola
    } catch (error) {
        // Si ocurre un error, muestra un mensaje de error
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Error en el inicio de sesión: ' + error.message;
        messageContainer.style.color = 'red'; // Color rojo para mensajes de error
        console.error('Código de error:', error.code); // Imprime el código de error en la consola
    }
});

// Manejo del botón de registro
registerButton.addEventListener('click', async () => {
    // Obtén los valores de los campos del formulario
    const email = document.getElementById('email').value; // Valor del correo electrónico
    const password = document.getElementById('password').value; // Valor de la contraseña

    // Valida que los campos no estén vacíos
    if (!email || !password) {
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Por favor, ingresa un correo y una contraseña para registrarte.';
        messageContainer.style.color = 'red'; // Mensaje de error en rojo
        return; // Detiene la ejecución si los campos están vacíos
    }

    try {
        // Intenta registrar un nuevo usuario con el método de Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Si tiene éxito, muestra un mensaje de éxito
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Registro exitoso. ¡Bienvenido!';
        messageContainer.style.color = 'green'; // Mensaje de éxito en verde
        console.log('Nuevo usuario:', userCredential.user.email); // Imprime el correo del nuevo usuario en la consola
    } catch (error) {
        // Si ocurre un error, muestra un mensaje de error
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Error en el registro: ' + error.message;
        messageContainer.style.color = 'red'; // Mensaje de error en rojo
        console.error('Código de error:', error.code); // Imprime el código de error en la consola
    }
});

//Manejo del botón de contraseña olvidada
forgetPasswordButton.addEventListener('click', async () => {
    // Obtén los valores de los campos del formulario
    const email = document.getElementById('email').value; // Valor del correo electrónico

    //Valida que el campo email no esté vacío
    if (!email) {
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Por favor, ingresa un correo para la recuperación de contraseña';
        messageContainer.style.color = 'red'; // Mensaje de error en rojo
        return; // Detiene la ejecución si los campos están vacíos
    }

    try {
        await sendPasswordResetEmail(auth, email);

        // Si tiene éxito, muestra un mensaje de éxito
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Email enviado correctamente';
        messageContainer.style.color = 'green'; // Mensaje de éxito en verde
    } catch (error) {
        // Si ocurre un error, muestra un mensaje de error
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Error en el registro: ' + error.message;
        messageContainer.style.color = 'red'; // Mensaje de error en rojo
        console.error('Código de error:', error.code); // Imprime el código de error en la consola
    }
});
