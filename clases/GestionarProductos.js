 
 //Modulo fetch para traer los articulos de la base de datos
 
 class GestionarProductos {

    iniciar() {

        fetch (url)

        .then (respuesta => respuesta.json())
        .then (resultado =>{
       

        productos = resultado.productos;
        
        let productosDestacados = productos.filter (prod => prod.destacado == 1);

        this.cargarProductos(productosDestacados);

    })
        
        this.mostrarCarrito();
        
        this.actualizarContador();
             
    }

    
    //Funcion encargada de cargar los productos relacionados con la busqueda


    cargarProductos(productos) { 
        
        const divProductos    = document.querySelector('#productos');
        divProductos.innerHTML = '';

        if(productos.length === 0) {

            this.mostrarHeader('No se han encontrado productos para su búsqueda');
            return false;
        } 
        else {          

            productos.forEach( (producto) => {

                const {  id : id_prod,
                    nombre : nombre_prod,
                    precio: precio_prod,
                    img : img_prod,
                    cantidad : cant_prod ,
                descripcion : descripcion_prod} = producto;


    
                let prod = document.createElement('div');
                prod.classList.add('col-12', 'h200', 'border', 'bg-white', 'rounded', 'mt-3', 'd-flex', 'align-items-center', 'p-3', 'flex-row', 'producto');
                prod.setAttribute('id', 'row_'+id_prod);    
               
        
                prod.innerHTML = `      <div class="w-20">
                                            <img src="../img/${img_prod}" alt="" width="150" height="150" >
                                        </div>
    
                                        <div class="p-3 d-flex flex-column w-60 h-150">
                                            <h3>${nombre_prod}</h3>                                            
                                            <p>${descripcion_prod.substring(0,120)}</p>
                                        </div>
    
                                        <div class="d-flex align-items-center justify-content-center flex-column w-20 h-150">
                                            <p class="precio">$${precio_prod}</p>
                                            <a href="javascript:addCarrito(${id_prod})" class="btn btn-primary">Agregar al carrito</a>
                                        </div>`;
    
                divProductos.appendChild(prod);
    
            } )    
        }
    }


    buscar( q ) { 

        let resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(q.toLowerCase() ) || producto.descripcion.toLowerCase().includes( q.toLowerCase()));      
        this.cargarProductos(resultado);                   
    }

// Metodo encargado de agregar los productos al carrito

    addCart(infoProducto) {
        
        
       const existe = carrito.some(producto => producto.id === infoProducto.id );


       if(existe) 
       {
          
           const articulos = carrito.map( producto => {

               if(producto.id === infoProducto.id)
               {
                   producto.cantidad++;
                   return producto;
               }
               else
               {
                   return producto;
               }

               carrito = articulos;               

           })


                      Toastify({
                        text: "Se actualizo la cantidad del producto",
                        duration: 2000,
                        gravity: 'bottom'
        
                    }).showToast();
           
    
       }
       else 
       {
           carrito.push(infoProducto);

           Toastify({
            text: "Se agrego el producto",
            duration: 3000,
            gravity: 'bottom'

        }).showToast();
          

       }

       this.actualizarCarrito();
    }

    //Contador de la cantidad de productos en el carrito

    contarProductos() { 

        let contadorProductos = 0;

        carrito.forEach((producto) => {

            contadorProductos = contadorProductos + parseInt(producto.cantidad);
        })

        return contadorProductos;
    }


    actualizarCarrito() {

        
        this.actualizarContador();

        
        this.mostrarCarrito();

        
        this.guardarCarrito();
    }


    actualizarContador() { 

        let totalArticulos = this.contarProductos();

        let countCarrito = document.querySelector('#badgeCarrito');


        countCarrito.innerHTML = totalArticulos;

    }

    //Metodo encargado de mostrar el carrito 


    mostrarCarrito() { 

        let detalleCarrito = document.querySelector('#idCarrito');
    
        detalleCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach( (producto) => {


            const {id, nombre, precio, img, cantidad} = producto;

    

            const row = document.createElement('div');
            row.classList.add('row');
            
            total += parseInt(precio);

            row.innerHTML = `
                
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <img src="${img}" width="80"/>
                        </div>

                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            ${nombre}
                        </div>

                        <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                            $ ${precio}
                        </div>

                        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                            ${cantidad}
                        </div>

                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                            <a href="javascript:eliminar(${id})">
                                <i class="fa-solid fa-square-minus fa-2x"></i>
                            </a>
                        </div>
            `;
    
            
            detalleCarrito.appendChild(row);

        })

        let row = document.createElement('div');
        row.classList.add('row');
        
        row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>`;


        detalleCarrito.appendChild(row);
    }

    //Metodo encargado de eliminar el articulo
  

    eliminarArticulo(id) { 

        Swal.fire({
            title: '"Desea eliminar el producto"',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: `Cancelar`,
          }).then((result) => {
            
            if (result.isConfirmed) 
            {
                carrito = carrito.filter( articulo => articulo.id != id);
                this.actualizarCarrito();

                this.mostrar_notificacion("el articulo fue eliminado",2000,"bottom");

            }            
          })         
          
    }
    

    guardarCarrito() { 
       
        localStorage.setItem(key_carrito, JSON.stringify(carrito));
        const dt = DateTime.now();
        let date =  dt.toLocaleString();       
        localStorage.setItem(key_actualizacion,date);

    }


    mostrarHeader(msg) { 
        const headerProductos = document.querySelector('#headerProductos');
        headerProductos.innerHTML = msg;
    }

    //Metodo encargado de las alertas que se muestran al usuario

mostrar_notificacion (texto,duracion,posicion){



                          Toastify({
                            text: texto,
                            duration: duracion,
                            gravity: posicion
            
                        }).showToast();


}


}

