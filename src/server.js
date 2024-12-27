import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import { create } from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import crypto from 'crypto'
import { __dirname } from './path.js'
import productRouter from './routes/productos.js'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'
import chatRouter from './routes/chat.routes.js'
import { Socket } from 'dgram'


/* const PORT = 3000

const server = http.createServer((req, res) => {
    res.end("Hola 👍")
})

server.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
}) */

// ---- Server Local - Peticiones

const app = express()
const hbs = create()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
}) 

await mongoose.connect("mongodb+srv://jdlb1305:Estabilisador12345@cluster0.cmr32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("BD conectada"))
.catch((e) => console.log("Error al conectar con bdd: ", e))


const io = new Server (server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars',hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use('/public', express.static(__dirname + '/public'))
app.use('/api/productos', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)
app.use('/upload', multerRouter)


const productos = [
    {nombre: "Helado Vainilla Fresa", marca: "Crem Helado", precio: 50000, stock: 10, status: true},
    {nombre: "Limonada de Coco", marca: "Crem Helado", precio: 25000, stock: 20, status: true},
    {nombre: "Helado Frutos Rojos", marca: "Colombina", precio: 30000, stock: 12, status: false}
]

app.get('/', (req,res) => {
    res.render('templates/productos', {productos: productos, js: 'productos.js', css: 'productos.css'})
})

let mensajes = []
//Conexiones de socket.io
//socket = info que llega de la conexion
io.on('connection', (socket) => { //Cuando se producza el "apreton de manos", puedo ejecutar las sigueintes funciones
    console.log('Usuario conectado: ', socket.id); //ID de conexion
    
    socket.on('mensaje', (data) => { //Cuando el usuario me envia un mensaje, trabajo con esos datos
        console.log('Mensaje recibido: ', data);
        mensajes.push(data)
        //Envia el array de mensajes
        socket.emit('respuesta', mensajes)
    })

    //Detectar desconexion
    socket.on('disconnect', ()=> {
        console.log('Usuario desconectado: ', socket.id);
    
    })
})


/*app.use(express.urlencoded({extended:true}))

const personas = [
    {
        id: 1,
        nombre: "Pepe",
        apellido: "Pere",
        edad: 30
    }, 
    {
        id: 2,
        nombre: "Marina",
        apellido: "Martinez",
        edad: 20
    },
    {
        id: 3,
        nombre: "Luciano",
        apellido: "Lopez",
        edad: 20
    },
]

app.get('/saludo', (req,res) => {
    res.send('Hola desde server en express')
})

app.get('/personas', (req,res) => {
    const {edad} = req.query
    console.log(edad)
    let resultado = personas.filter(persona => persona.edad == parseInt(edad))
    res.send(resultado)
})

app.get('/personas/:idPersona', (req,res) => { //: indican que va a ser dinamico
    const idPersona = req.params.idPersona
    const persona = personas.find(persona => persona.id == parseInt(idPersona))
    res.send(persona)
}) */