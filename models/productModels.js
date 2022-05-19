let products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

// Get all products
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

// Get a product by id
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product);
    });
}

// Create a product
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product }
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct)
    })
}

// Update a product
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex(p => p.id === id)
        products[index] = { id, ...product }
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    });
}

// Delete a product
function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        writeDataToFile('./data/products.json', products)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}