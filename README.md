# Mapa con Leaflet
Aplicacion web que muestra un mapa de Castro Urdiales utilizando la biblioteca de JavaScript Leaflet, en el cual se utilizan marcadores que contienen informacion sobre el lugar con OpenWeatherMap.
## Recursos utilizados
- Leaflet.js (biblioteca)
- OpenStreetMap (proveedor de mapas base)
- OpenWeatherMap (API)
## Construccion y problemas encontrados
Creamos un mapa con recursos de la biblioteca de leaflet, ayudandonos de openstreetmap para generar el mapa. Añadimos marcadores con coodernadas en cada punto, y pasamos esas coodernadas a OpenWeatherMap para que acceda a los datos de estas.
Utilizamos la API de current weather data de OpenWeatherMap, ya que nos proporciona gratuitamente una api key en las que proporcionamos de cada localizacion la latitud y la longitud.
