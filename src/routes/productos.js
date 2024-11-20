import {Router} from 'express'
import crypto from 'crypto'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path';


const productRouter = Router()

const productosPath = path.resolve(__dirname, '../src/db/productos.json');

const productosData = await fs.readFile(productosPath, 'utf-8');
const productos = JSON.parse(productosData); 


productRouter.get('/', (req,res) => {
    const {limit} = req.query
    const products = productos.slice(0, limit)
    res.status(200).send(productos)
})

productRouter.get('/:pid', (req,res) => {
    const idProducto = req.params.pid
    const producto = productos.find(prod => prod.id == idProducto)

    if(producto) {
        res.status(200).send(producto)
    } else {
        res.status(404).send({mensaje: "El producto no existe"})
    }
})

productRouter.post('/', async (req,res) => {
    const {name, description, code, price, category, stock} = req.body
    const nuevoProducto = {
         id: crypto.randomBytes(10).toString('hex'), //Me genera un id unico
         name: name,
         description: description,
         code: code,
         category: category,
         price: price,
         stock: stock,
         status: true,
         thumbnails: []
    }
    productos.push(nuevoProducto)
    await fs.writeFile(productosPath, JSON.stringify(productos)) 
    res.status(201).send({mensaje: `Producto creado correctamente con el id: ${nuevoProducto.id}`})
 })

 productRouter.delete('/:pid', (req,res) => {
    const idProducto = req.params.pid
    const indice = productos.findIndex(prod => prod.id == idProducto)
    if(indice != -1) {
        productos.splice(indice, 1)
        res.status(200).send({mensaje: 'Producto eliminado'})
    } else {
        res.status(404).send({mensaje: "El producto no existe"})
    }
})

 productRouter.put('/:pid', (req,res) => {
    const idProducto = req.params.pid
    const {name, description, code, price, category, stock,thumbnails, status} = req.body
    const indice = productos.findIndex(prod => prod.id == idProducto)
    console.log(indice);
    
    if(indice != -1) {
        productos[indice].name = name
        productos[indice].description = description
        productos[indice].code = code
        productos[indice].price = price
        productos[indice].stock = stock
        productos[indice].status = status
        productos[indice].category = category
        productos[indice].thumbnails = thumbnails
        
        res.status(200).send({mensaje: "Producto actualizado"})
    } else {
        res.status(404).send({mensaje: "El producto no existe"})
    }
})

export default productRouter