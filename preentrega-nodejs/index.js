// Capturamos los comandos de la terminal
const [ , , metodo, endpoint] = process.argv;

const ejecutarSistema = async () => {
    try {
        // Traemos todos los productos
        if (metodo === "GET" && endpoint === "products") {
            const respuesta = await fetch("https://fakestoreapi.com/products");
            const productos = await respuesta.json();
            console.log("Lista completa de productos:", productos);
        }

        // Buscamos un producto por ID
        else if (metodo === "GET" && endpoint.startsWith("products/")) {
            const id = endpoint.split("/")[1];
            const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
            const producto = await respuesta.json();
            console.log(`Producto con ID ${id}:`, producto);
        }

        // Creamos un producto nuevo
        else if (metodo === "POST" && endpoint === "products") {
            const [ , , , , title, price, category ] = process.argv;

            const nuevoProducto = {
                title,
                price: Number(price),
                category
            };

            const respuesta = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                body: JSON.stringify(nuevoProducto),
                headers: { "Content-Type": "application/json" }
            });

            const resultado = await respuesta.json();
            console.log("Producto creado correctamente:", resultado);
        }

        // Eliminamos un producto
        else if (metodo === "DELETE" && endpoint.startsWith("products/")) {
            const id = endpoint.split("/")[1];
            const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "DELETE"
            });

            const resultado = await respuesta.json();
            console.log(`Producto con ID ${id} eliminado:`, resultado);
        }

        // Comando inválido
        else {
            console.log("Comando inválido. Usa GET, POST o DELETE con el formato correcto.");
        }
    } catch (error) {
        console.error("Error en la ejecución:", error.message);
    }
};

ejecutarSistema();


