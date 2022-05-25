
function traerDatos() {
    try{
        fetch('https://mustang-tesito.herokuapp.com/api/lubri.json')
        .then(respuesta => respuesta.json())
        .then(datos =>{
            loadData(datos)
        })
    }
    catch(e){
        console.log({e})
    }
}
function loadData(datos){
    datos.forEach((data,index) => {
        const lista = document.createElement('tr');
        lista.innerHTML = ` 
            <td>${data.Articulo}: </td>
            <td>${data.Descripción}</td>
            <td>$${data.Precio}</td>
            <button id="btn_${index}" data-precio='${data.Precio}' data-name='${data.Articulo}' class="boton agrear_carro" onclick="addOrder(this)">Agregar al Carrito</button>`;
        listaProductos.appendChild(lista);
    });
}

function vaciar(){
    document.getElementById('listaCarrito').innerHTML=``
    calcularPrecio()
}


function pagar(){
    const monto=document.getElementById('total').innerHTML.trim()
    if(monto == 'Total a pagar: $0')
        return 
    const swalWithBootstrapButtons2 = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons2.fire({
        title: `${monto}`,
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        html:
        `<form class="form-order">
        <div class="row">
            <div class="form-group col-6">
                <label for="first-name">First Name</label>
                <input type="text" class="form-control" placeholder="First Name" id="first-name">
            </div>
            <div class="form-group col-6">
                <label for="first-name">Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" id="last-name">
            </div>
        </div>
        <label for="email">Email</label>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Email Address" id="secondary-email">
        </div>
        <br>
        <label for="address">Address</label>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Address" id="address">
        </div>
        <div class="row">
            <div class="col-4">
                <label for="country">Country</label>
                <div class="input-group">
                <input type="text" class="form-control" placeholder="Country" id="Country">
                </div>

            </div>
            <div class="col-4">
                <label for="state">State</label>
                <div class="input-group">
                <input type="text" class="form-control" placeholder="State" id="State">
                </div>
            </div>
            <div class="col-4">
                <label for="zip">Zip</label>
                <div class="input-group">
                    <input type="text" class="form-control">
                </div>
            </div>
        </div>
        <hr>
        <h5>Payment</h5>
        <div class="input-group">
            <select class="custom-select">
                <option value="Creadit Card">Creadit Card</option>
                <option value="Debit Card">Creadit Card</option>
            </select>
        </div>
        <div id="card-payment">
            <hr>
            <div class="row">
                <div class="form-group col-6">
                    <label for="nameoncard">Name on card</label>
                    <input type="text" class="form-control" id="nameoncard">
                    <span class="form-text text-muted" for="nameoncard" style="font-size:60%;">Full name as
                        displayed on card</span>
                </div>
                <div class="form group col-6">
                    <label for="card-number">Card number</label>
                    <input type="text" class="form-control" id="card-number">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-3">
                    <label for="expiration">Expiration</label>
                    <input type="text" class="form-control" id="expiration">
                </div>
                <div class="form-group col-3">
                    <label for="cvv">CVV</label>
                    <input type="text" class="form-control" id="cvv">
                </div>
            </div>
        </div>
        </form>`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            return swalWithBootstrapButtons2.fire(
            'Compra realizada con exito!',
            'Le enviaremos el informe de su pedido /n Gracias!',
            'success'
            )
        } 
        swalWithBootstrapButtons2.fire(
            'Cancelado',
            'Su compra fue cancelada',
            'error'
        )
    })
}

function addOrder(e){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Agregar Producto?',
        text: "Se agregara el producto al carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, agregar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const _this=e
            const objData={
                name:_this.getAttribute('data-name'),
                price:_this.getAttribute('data-precio')
            }
            const lista = document.createElement('tr');
            lista.innerHTML = `<td>${objData.name}</td> <td>${objData.price}</td> `;
            listaCompra.appendChild(lista);
            calcularPrecio()
            window.scroll(0,document.body.scrollHeight)
            swalWithBootstrapButtons.fire( 'Agregado!')
        } else if (  result.dismiss === Swal.DismissReason.cancel  ) {
            swalWithBootstrapButtons.fire( 'Compra cancelada' )
        }
    })
}
function calcularPrecio(){
    let suma = 0
    const idCarrito= document.getElementById('listaCarrito')
    if(idCarrito && idCarrito.rows ){
        for (var i = 0, row; row = idCarrito.rows[i]; i++) {
            const price=row.cells[1].innerHTML.replace(",","")
            suma+=parseFloat(price)
        }
    }
    document.getElementById('total').innerHTML=`Total a pagar: $${suma.toFixed()}`
}

const listaProductos = document.getElementById('contenedor');
const listaCompra = document.getElementById('listaCarrito');
traerDatos();
document.getElementById("pagar").addEventListener('click',pagar);
document.getElementById("vaciar").addEventListener('click',vaciar);


