# AgriWeb-App
Plataforma Inteligente de Agricultura Local
# MANUAL BASICO PARA LA CREACION DE DATATABLES
 DataTables es un plugin muy útil para crear tablas interactivas con características como paginación, búsqueda y ordenación.
 
 1. INCLUIR LAS DEPENDENCIAS
Lo primero es incluir los archivos necesarios de jQuery y DataTables en tu proyecto. Puedes hacerlo de la siguiente forma:
  <!-- Incluir jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <!-- Incluir JS y el CSS de DataTables -->
 <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>

2. CREAR UNA TABLA HTML BASICA
Crea una tabla sencilla en HTML. Aquí tienes un ejemplo básico:
ejemplo:
vconst articleTab1 = document.getElementById('tab1');
 
 
    let tablaContenedor = articleTab1.querySelector('.tabla-alumno');
    if (!tablaContenedor) {
        tablaContenedor = document.createElement('div');
        tablaContenedor.classList.add('tabla-alumno');
        articleTab1.appendChild(tablaContenedor);
    }
 
   
    const borrarTabla = tablaContenedor.querySelector('table');
    if (borrarTabla) {
        tablaContenedor.removeChild(borrarTabla);  // Elimina la tabla de alumnos anterior
    }
    
    3. INICIALIZAR DATATABLES EN JQUERY
    4. 
