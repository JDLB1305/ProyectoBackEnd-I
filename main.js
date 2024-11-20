/* import moment from "moment";

console.log(moment); */

import crypto from 'crypto'
//import fs from 'fs'
import {promises as fs} from 'fs' //ALIAS

/* const generarSalt = () => {
    return crypto.randomBytes(16).toString('hex')
}

const encriptar = (password, salt) => {
    const hash = crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex')
    return hash
}

const password = "mamaheuo"
const salt = generarSalt()
console.log(encriptar(password, salt)) */



//Crear archivos Sicronicos

/* const RUTA = './ejemplo.txt'

if (fs.existsSync(RUTA)) {
    fs.appendFileSync(RUTA, "🤨\n")
    let contenido = fs.readFileSync(RUTA, 'utf-8')
    console.log(contenido)

    fs.unlinkSync(RUTA)
} else {
    fs.writeFileSync(RUTA, "")
}

console.log(); */

const RUTA = './productos.json'

const guardarProducto = async (nombre, marca, precio, stock) => {
    const producto = {
        id: crypto.randomBytes(5).toString("hex"),
        nombre: nombre, 
        marca: marca,
        precio: precio,
        stock: stock
    }

    let productos = JSON.parse(await fs.readFile(RUTA, 'utf-8'))

    const indice = productos.findIndex((prod) => prod.id == producto.id)
    
    if(indice != -1) {
        productos[indice].stock += producto.stock
    } else {
        productos.push(producto)
    }

    await fs.writeFile(RUTA, JSON.stringify(productos))
    
}

guardarProducto("Helado Vainilla Fresa", "Crem Helado", 50000, 10)

 