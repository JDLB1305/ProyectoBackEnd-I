import {Router} from 'express'
/* import crypto from 'crypto'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path'; */
import { getProducts, getProduct,createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js';

const productRouter = Router()

/* const productosPath = path.resolve(__dirname, '../src/db/productos.json');

const productosData = await fs.readFile(productosPath, 'utf-8');
const productos = JSON.parse(productosData);  */


productRouter.get('/', getProducts)

productRouter.get('/:pid', getProduct)

productRouter.post('/', createProduct)

 productRouter.delete('/:pid', deleteProduct)

 productRouter.put('/:pid', updateProduct)

export default productRouter