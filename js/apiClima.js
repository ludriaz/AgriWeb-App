/**
 * Obtiene la latitud y longitud de una ciudad usando la API de geocodificación de Open-Meteo.
 * @param {string} ciudad - Nombre de la ciudad ingresada por el usuario.
 * @returns {Promise<Object>} - Objeto con latitud, longitud, nombre y país o un error.
 */
async function getCoordinates(ciudad) {
    if (!ciudad.trim()) {
        return { error: 'Por favor, ingresa una ciudad.' };
    }

    try {
        // Llamada a la API para obtener la latitud y longitud de la ciudad
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es`);
        const data = await response.json();

        // Si no hay resultados, devolver un error
        if (!data.results) {
            return { error: 'Ciudad no encontrada.' };
        }

        // Extraer datos de la primera coincidencia
        const { latitude, longitude, name, country } = data.results[0];
        return { latitude, longitude, name, country };
    } catch (error) {
        console.error('Error obteniendo las coordenadas:', error);
        return { error: 'Error al obtener la ubicación.' };
    }
}

/**
 * Obtiene los datos del clima en base a latitud y longitud con la API Open-Meteo
 * Devuelve un JSON con una selección de datos filtrada a partir de la respuesta
 * @param {number} latitud - Latitud de la ubicación.
 * @param {number} longitud - Longitud de la ubicación.
 * @returns {Promise<Object>} - Objeto con datos del clima o un error.
 */
async function obtenerDatosMeteorologicos(latitud, longitud) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature,visibility,pressure_msl,uv_index,precipitation,cloudcover&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Aquí puedes reorganizar los datos en el formato que prefieras

        return {
            latitud: latitud,
            longitud: longitud,
            temperaturaActual: datos.hourly.temperature_2m[0],
            humedad: datos.hourly.relativehumidity_2m[0],
            viento: datos.hourly.windspeed_10m[0],
            temperaturaMaxima: datos.daily.temperature_2m_max[0],
            temperaturaMinima: datos.daily.temperature_2m_min[0],
        };

    } catch (error) {
        console.error("Error al obtener los datos meteorológicos:", error);
        return null;
    }
}

/**
 * Obtiene y muestra los datos meteorológicos basados en la ciudad ingresada o la geolocalización del usuario.
 * @returns {Promise<void>}
 */
async function getWeather() {
    const ciudad = document.getElementById("ciudad").value.trim();
    let coordinates;

    // Se comprueba si se ha introducido una ciudad, si no se recoge la localización del dispositivo
    try {
        if (ciudad) {
            coordinates = await getCoordinates(ciudad);
            if (coordinates.error) throw new Error(coordinates.error);
        } else {
            coordinates = await getCurrentLocation();
        }

        // Se recogen los datos del clima de las coordenadas
        const datosClima = await obtenerDatosMeteorologicos(coordinates.latitude, coordinates.longitude);
        if (!datosClima) throw new Error("Error al obtener la información del clima.");

        // Se recogen algunos datos para mostrarlo
        const infoMeteo = `
            Ciudad: ${coordinates.name || "Ubicación actual"}, ${coordinates.country || ""}
            Temperatura Actual: ${datosClima.temperaturaActual}°C
            Humedad: ${datosClima.humedad}%
            Viento: ${datosClima.viento} m/s
            Temperatura Máxima: ${datosClima.temperaturaMaxima}°C
            Temperatura Mínima: ${datosClima.temperaturaMinima}°C
        `;

        document.getElementById("resultado-clima").textContent = infoMeteo;

    } catch (error) {
        document.getElementById("resultado-clima").textContent = error.message;
    }
}


/**
* Obtiene la geolocalización del dispositivo.
* @returns {Promise<Object>} - Objeto con latitud y longitud o un error.
*/
function getCurrentLocation() {
   return new Promise((resolve, reject) => {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(
               (position) => {
                   resolve({
                       latitude: position.coords.latitude,
                       longitude: position.coords.longitude,
                   });
               },
               (error) => {
                   reject({ error: 'Error al obtener la ubicación.' });
               }
           );
       } else {
           reject({ error: 'El navegador no soporta la geolocalización.' });
       }
   });
}