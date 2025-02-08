# Ejemplo de Datatables con JSON

Este proyecto es un ejemplo de cómo utilizar la librería DataTables para mostrar datos en una tabla HTML a partir de un archivo JSON.

## Tecnologías utilizadas

HTML para la estructura de la página.

JavaScript para la manipulación del DOM.

jQuery para facilitar la manipulación de la tabla y el manejo de eventos.

DataTables para la creación y gestión de la tabla con funcionalidades avanzadas.

JSON como fuente de datos para la tabla.

## USO

Asegurarse de que el archivo datos.json contiene datos en el siguiente formato dado que de ahaí sacará la información del json: 
```
[
    {
        "Nombre ciudad": "Madrid",
        "Temperatura actual": "15°C",
        "Condicion Meteorologica": "Soleado",
        "Region": "Madrid",
        "Pais": "España",
        "Hora": "12:00 PM"
    }
]
```

Abrir index.html en un navegador.

La tabla debería poblarse automáticamente con los datos del archivo JSON.

## Código clave

El script principal para inicializar DataTables en script.js:
```
$(document).ready(function() {
    $('#example').DataTable({
        ajax: 'datos.json',
        columns: [
            { data: 'Nombre ciudad' },
            { data: 'Temperatura actual' },
            { data: 'Condicion Meteorologica' },
            { data: 'Region' },
            { data: 'Pais' },
            { data: 'Hora' }
        ]
    });
});
```
