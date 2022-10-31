 class GestionarProductos {

    iniciar() {

        productos = [

            {
                "id": 1,
                "nombre": "Cuado con varios Papá Noel",
                "descripcion": "Cuadro de papa noel",
                "precio": 150000,
                "stock": 10,
                "img": "Cuadro-noeles.jpg",
                "destacado": 1
            },
            {
                "id": 2,
                "nombre": "Cuadro de oso",
                "descripcion": "Cuadro de oso",
                "precio": 100000,
                "stock": 10,
                "img": "Cuadro-oso.jpg",
                "destacado": 1
            },

            {
                "id": 3,
                "nombre": "Cuadro Noel chimenea",
                "descripcion": "Cuadro de papa noel en chimenea",
                "precio": 120000,
                "stock": 5,
                "img": "cuadronoel.jpg",
                "destacado": 0
            },
            {
                "id": 4,
                "nombre": "Cuadro Sagrada Familia",
                "descripcion": "Cuadro de la sagrada familia",
                "precio": 170000,
                "stock": 3,
                "img": "Cuadro-sagrada-familia.jpg" ,
                "destacado": 0
            },
            {
                "id": 5,
                "nombre": "Cuadro Noel & Reno",
                "descripcion": "Cuadro noel y reno en patchwork",
                "precio": 100000,
                "stock": 5,
                "img": "cuadropatch.jpg",
                "destacado": 0
            },
            {
                "id": 6,
                "nombre": "Juego de cubresillas",
                "descripcion": "Cubresillas",
                "precio": 90000,
                "stock": 12,
                "img": "cubresilla2.jpg",
                "destacado": 1
            },
            {
                "id": 7,
                "nombre": "Cubresillas muñeco de nieve",
                "descripcion": "Cubresillas muñeco de nieve",
                "precio": 90000,
                "stock": 3,
                "img": "cubresiila1.jpg",
                "destacado": 0
            },
            {
                "id": 8,
                "nombre": "Muñeco de nieve",
                "descripcion": "Muñeco de nieve con bufanda",
                "precio": 140000,
                "stock": 6,
                "img": "nieve1.jpg",
                "destacado": 1
            },
            {
                "id": 9,
                "nombre": "Muñeco de nieve & Papa Noel",
                "descripcion": "Muñeco de nieve & Papa Noel",
                "precio": 200000,
                "stock": 4,
                "img": "nievesanta.jpg",
                "destacado": 1
            },
            {
                "id": 10,
                "nombre": "Pendon de renos & Papa Noel",
                "descripcion": "Pendon de renos y papa noel",
                "precio": 135000,
                "stock": 7,
                "img": "Pendon-renos.jpg",
                "destacado": 0
            },
            {
                "id": 11,
                "nombre": "Pareja de renos",
                "descripcion": "Pareja de renos",
                "precio": 185000,
                "stock": 1,
                "img": "renos-besos.jpg",
                "destacado": 0
            },
            {
                "id": 12,
                "nombre": "Set hojas en porcelanicrom",
                "descripcion": "Hojas en porcelanicrom",
                "precio": 70000,
                "stock": 12,
                "img": "Hojas-por.jpg",
                "destacado": 1
            },
            {
                "id": 13,
                "nombre": "Reloj de pared en puntillismo",
                "descripcion": "Reloj de pared en puntillismo",
                "precio": 70000,
                "stock": 2,
                "img": "puntillismo.jpg",
                "destacado": 1
            },
            {
                "id": 14,
                "nombre": "Dulcero en porcelanicrom",
                "descripcion": "Dulcero en procelanicrom",
                "precio": 120000,
                "stock": 6,
                "img": "Dulcero-porce.jpg",
                "destacado": 0
            }



        ]

        let productosDestacados = productos.filter( prod => prod.destacado == 1 );

        this.cargarProductos( productosDestacados );
        
        this.mostrarCarrito();
        
        this.actualizarContador();
             
    }



    cargarProductos( productos ) { 
        
        const divProductos    = document.querySelector('#productos');
        divProductos.innerHTML = '';

        if( productos.length === 0 ) {

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
    
                divProductos.appendChild( prod );
    
            } )    
        }
    }


    buscar( q ) { 

        let resultado = productos.filter( producto => producto.nombre.toLowerCase().includes( q.toLowerCase() ) || producto.descripcion.toLowerCase().includes( q.toLowerCase() ));      
        this.cargarProductos( resultado );                   
    }



    addCart( infoProducto ) {
        
        
       const existe = carrito.some( producto => producto.id === infoProducto.id );


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

    contarProductos() { 

        let contadorProductos = 0;

        carrito.forEach(( producto ) => {

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


    mostrarCarrito() { 

        let detalleCarrito = document.querySelector('#idCarrito');
    
        detalleCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach( ( producto ) => {


            const { id, nombre, precio, img, cantidad  } = producto;

    

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

  

    eliminarArticulo( id ) { 

        Swal.fire({
            title: '"Desea eliminar el producto"',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo',
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
       
        localStorage.setItem(key_carrito, JSON.stringify( carrito ));
        const dt = DateTime.now();
        let date =  dt.toLocaleString();       
        localStorage.setItem(key_actualizacion,date);

    }


    mostrarHeader( msg ) { 
        const headerProductos = document.querySelector('#headerProductos');
        headerProductos.innerHTML = msg;
    }


mostrar_notificacion (texto,duracion,posicion){



                          Toastify({
                            text: texto,
                            duration: duracion,
                            gravity: posicion
            
                        }).showToast();


}


}

