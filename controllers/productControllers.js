const Product = require('../models/productModels');
const { getPostData } = require('../utils');

// @desc    Get All products
// @desc    GET /api/products

async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.error(error);
    }
}

// @desc    Get a single product
// @desc    GET /api/products/:id

async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.error(error);
    }
}

// @desc    Create a product
// @desc    POST /api/products

async function createProducts(req, res) {
    try {
        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))
    } catch (error) {
        console.error(error);
    }
}

// @desc    Update a product
// @desc    PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            const body = await getPostData(req)

            const { title, description, price } = JSON.parse(body);

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct));
        }
    } catch (error) {
        console.error(error);
    }
}

// @desc    Delete a product
// @desc    DELETE /api/products/:id

async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Product ${id} has been deleted` }));
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct
}