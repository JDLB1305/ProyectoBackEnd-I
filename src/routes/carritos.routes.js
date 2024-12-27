import { Router } from "express";
import { getCart, createCart, insertProductCart, updateProductsCart, updateQuantityProductCart, deleteCart, deleteProductCart } from "../controllers/carts.controllers.js";
import crypto from 'crypto'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path';

const cartRouter = Router()

/* const carritosPath = path.resolve(__dirname, '../src/db/carritos.json');

const carritosData = await fs.readFile(carritosPath, 'utf-8');
const carritos = JSON.parse(carritosData); */


cartRouter.get('/:cid', getCart)

cartRouter.post('/', createCart)


cartRouter.post('/:cid/products/:pid', insertProductCart)
cartRouter.put('/:cid', updateProductsCart) 
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.delete('/:cid/products/:pid', deleteProductCart)

export default cartRouter