import { Request, Response } from "express"
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    res.json({ data: products })
}
export const getProductById = async (req: Request, res: Response) => {
  
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    res.json({ data: product })
}

export const createProduct = async (req: Request, res: Response) => {

        /*Primera forma con new
        *const product = new Product(req.body)
        *const saveProduct = await product.save()*/

        //Segunda Forma con create
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })        
}

export const updateProduct = async (req: Request, res: Response) => {
    //Primero comprobar que el ID exista
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}

export const updateAvaliability = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    //Cambia al estado contrario desde la DB
    product.avaliability = !product.dataValues.avaliability
    await product.save()
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return
    }

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })

}