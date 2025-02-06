document.addEventListener("DOMContentLoaded", function () {
    $('#example').DataTable({
        ajax: 'datos.json', // Carga el archivo JSON
        columns: [
            { data: 'name' },
            { data: 'age' },
            { data: 'city' }
        ]
    });
});
