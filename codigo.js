class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {
        // Validacion que todos los campos son obligatorios
        if (!product.name || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validacion que no se repite el campo "code"
        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            console.error("El código del producto ya existe.");
            return;
        }

        // producto con id autoincrementable
        product.id = this.productIdCounter++;
        this.products.push(product);
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
}

// uso con productos de protección personal en la industria de alimentos
const productManager = new ProductManager();

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

console.log("Todos los productos:", productManager.getProducts());

const productIdToSearch = 2;
console.log("Producto con ID", productIdToSearch, ":", productManager.getProductById(productIdToSearch));