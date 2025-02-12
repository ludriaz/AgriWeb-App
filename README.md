# Mapa con Leaflet
Aplicacion web que muestra un mapa de Castro Urdiales utilizando la biblioteca de JavaScript Leaflet, en el cual se utilizan marcadores que contienen informacion sobre el lugar con OpenWeatherMap.
## Recursos utilizados
- Leaflet.js (biblioteca)
- OpenStreetMap (proveedor de mapas base)
- OpenWeatherMap (API)

## Como construir e inicializar el mapa
Dentro de la pagina oficial de la API leaflet existe un pequeño tutorial para ello: 
https://leafletjs.com/examples/quick-start/

1- Exportar el link del CSS y DESPUES de este, el script de Leaflet dentro del index
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
<!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

2- Añadir una etiqueta que contendra al mapa con un identificador (añadir CSS)
<div id="map"></div>
<style>
#map { height: 180px; }
</style>

3- Establecer las cordenadas donde se situara el mapa dentro del script
var map = L.map('map').setView([latitud,  longitud], zoom);

## Construccion y problemas encontrados
Creamos un mapa con recursos de la biblioteca de leaflet, ayudandonos de openstreetmap para generar el mapa. Añadimos marcadores con coodernadas en cada punto, y pasamos esas coodernadas a OpenWeatherMap para que acceda a los datos de estas.
Utilizamos la API de current weather data de OpenWeatherMap, ya que nos proporciona gratuitamente una api key en las que proporcionamos de cada localizacion la latitud y la longitud.
