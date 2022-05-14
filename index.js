const listaProductos = document.getElementById('contenedor');

function traerDatos() {
    fetch('productos.json')
    .then(respuesta => respuesta.json())
    .then(datos =>{
        datos.forEach(data => {
            const lista = document.createElement('tr');
            lista.innerHTML = ` 
                                <td>${data.Artículo}</td>
                                <td>${data.Descripción}</td>
                                <td>${data.Precio}</td>
                                <button id="btn" class="boton">Agregar al Carrito</button>`;
            listaProductos.appendChild(lista);
        });
    })
}
traerDatos();

