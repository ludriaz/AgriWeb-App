# Autenticación con Firebase

Este proyecto implementa un sistema de autenticación de usuarios mediante correo electrónico y contraseña utilizando Firebase Authentication.

## Tecnologías Utilizadas

Firebase (Autenticación de usuarios)

JavaScript (Manejo de eventos y autenticación)

HTML & CSS (Interfaz básica del usuario)

## Configuración

### 1. Crear un Proyecto en Firebase

    Si aún no tienes un proyecto en Firebase, sigue estos pasos:

        Ve a Firebase Console

        Crea un nuevo proyecto.

        Dentro del proyecto crea una nueva app Web, como se ve en la imagen:
![image](https://github.com/user-attachments/assets/f62424aa-18bb-430d-b355-bfa44db9f865)

        
        Una vez creada la app, habilita la autenticación con correo y contraseña en la sección de "Authentication".
![image](https://github.com/user-attachments/assets/df8d3e5f-255f-4e3f-9e66-1da2cf720a00)
![image](https://github.com/user-attachments/assets/d8f8949d-2927-4d08-9d06-e9f947664e24)
![image](https://github.com/user-attachments/assets/98215fa1-b9fe-4c70-b6cf-4d8d5278f823)

        Obtén la configuración del SDK en la sección de "Project Settings" y reemplaza los valores en firebaseConfig.

### 2. Configurar Firebase en el Proyecto

Modifica la siguiente configuración con los valores obtenidos de Firebase:

```
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
};
```

## Uso

### Iniciar Sesión

Ingresa un correo electrónico y una contraseña en el formulario.

Presiona el botón de "Iniciar Sesión".

Si las credenciales son correctas, se mostrará un mensaje de éxito.

### Registrarse

Ingresa un correo electrónico y una contraseña en el formulario.

Presiona el botón de "Registrarse".

Si el registro es exitoso, se mostrará un mensaje de bienvenida.
