# Autenticación con Firebase

Este proyecto implementa un sistema de autenticación de usuarios mediante correo electrónico y contraseña utilizando Firebase Authentication.

## Tecnologías Utilizadas

Firebase (Autenticación de usuarios)

JavaScript (Manejo de eventos y autenticación)

HTML & CSS (Interfaz básica del usuario)

## Configuración

1. Crear un Proyecto en Firebase

Si aún no tienes un proyecto en Firebase, sigue estos pasos:

Ve a Firebase Console

Crea un nuevo proyecto.

Habilita la autenticación con correo y contraseña en la sección de "Authentication".

Obtén la configuración del SDK en la sección de "Project Settings" y reemplaza los valores en firebaseConfig.

2. Configurar Firebase en el Proyecto

Modifica la siguiente configuración con los valores obtenidos de Firebase:

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
};

Uso

Iniciar Sesión

Ingresa un correo electrónico y una contraseña en el formulario.

Presiona el botón de "Iniciar Sesión".

Si las credenciales son correctas, se mostrará un mensaje de éxito.

Registrarse

Ingresa un correo electrónico y una contraseña en el formulario.

Presiona el botón de "Registrarse".

Si el registro es exitoso, se mostrará un mensaje de bienvenida.
