const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;

        // Cargar productos existentes desde el archivo al inicializar la clase
        this.loadProductsFromFile();
    }

    loadProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            // Establecer el contador de IDs en función de los productos cargados
            this.productIdCounter = this.calculateNextId();
        } catch (error) {
            // Si hay un error al leer el archivo, asumimos que aún no hay productos
            console.log("No se pudo cargar el archivo de productos. Se creará uno nuevo.");
        }
    }

    saveProductsToFile() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (error) {
            console.error("Error al guardar en el archivo de productos:", error.message);
        }
    }

    calculateNextId() {
        if (this.products.length === 0) {
            return 1; // Si no hay productos, empezar desde el ID 1
        }
        // Encontrar el ID más alto y sumar 1
        return Math.max(...this.products.map(product => product.id)) + 1;
    }

    addProduct(product) {
        // Asignar un ID autoincrementable
        product.id = this.productIdCounter++;
        this.products.push(product);

        // Guardar en el archivo
        this.saveProductsToFile();

        console.log("Producto agregado:", product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(existingProduct => existingProduct.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
        }
        return product;
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            // Actualizar el producto sin cambiar su ID
            updatedProduct.id = id;
            this.products[index] = updatedProduct;
            this.saveProductsToFile();
            console.log("Producto actualizado:", updatedProduct);
        } else {
            console.error("Producto no encontrado para actualizar.");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            this.saveProductsToFile();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.error("Producto no encontrado para eliminar.");
        }
    }
}

// Uso con la ruta del archivo
const productManager = new ProductManager('productos.json');

// Agregar productos
productManager.addProduct({
    name: "Cubre Calzado",
    description: "Protección para los zapatos en la industria de alimentos.",
    price: 9.99,
    thumbnail: "/images/cubre_calzado.jpg",
    code: "CC001",
    stock: 100
});

productManager.addProduct({
    name: "Cofia",
    description: "Cofia para cubrir el cabello en entornos de alimentos.",
    price: 5.99,
    thumbnail: "/images/cofia.jpg",
    code: "CF002",
    stock: 50
});

productManager.addProduct({
    name: "Pechera",
    description: "Pechera para protección en la zona del pecho en la industria alimentaria.",
    price: 12.99,
    thumbnail: "/images/pechera.jpg",
    code: "PC003",
    stock: 30
});

productManager.addProduct({
    name: "Manguillas",
    description: "Manguillas para proteger los brazos en la manipulación de alimentos.",
    price: 7.99,
    thumbnail: "/images/manguillas.jpg",
    code: "MG004",
    stock: 40
});

// Imprimir todos los productos
console.log("Todos los productos:", productManager.getProducts());

// Ejemplo de actualización de un producto
const productIdToUpdate = 2;
const updatedProductData = {
    name: "Nueva Cofia",
    description: "Cofia actualizada",
    price: 7.99,
    thumbnail: "/images/nueva_cofia.jpg",
    code: "CF002",
    stock: 75
};
productManager.updateProduct(productIdToUpdate, updatedProductData);

// Ejemplo de eliminación de un producto
const productIdToDelete = 3;
productManager.deleteProduct(productIdToDelete);

// Imprimir nuevamente todos los productos después de las operaciones
console.log("Productos después de las operaciones:", productManager.getProducts());

// Ejemplo de búsqueda por ID
const productIdToSearch = 2;
console.log("Producto con ID", productIdToSearch, ":", productManager.getProductById(productIdToSearch));