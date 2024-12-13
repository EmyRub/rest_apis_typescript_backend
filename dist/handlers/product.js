"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvaliability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    const products = await Product_model_1.default.findAll({
        order: [
            ['id', 'DESC']
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    res.json({ data: products });
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
        return;
    }
    res.json({ data: product });
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    /*Primera forma con new
    *const product = new Product(req.body)
    *const saveProduct = await product.save()*/
    //Segunda Forma con create
    const product = await Product_model_1.default.create(req.body);
    res.status(201).json({ data: product });
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    //Primero comprobar que el ID exista
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
        return;
    }
    //Actualizar
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
const updateAvaliability = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
        return;
    }
    //Cambia al estado contrario desde la DB
    product.avaliability = !product.dataValues.avaliability;
    await product.save();
    res.json({ data: product });
};
exports.updateAvaliability = updateAvaliability;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
        return;
    }
    await product.destroy();
    res.json({ data: 'Producto Eliminado' });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map