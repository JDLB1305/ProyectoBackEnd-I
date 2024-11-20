import http from 'http'
import express from 'express'
import crypto from 'crypto'
import { __dirname } from './path.js'
import productRouter from './routes/productos.js'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'


/* const PORT = 3000

const server = http.createServer((req, res) => {
    res.end("Hola 👍")
})

server.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
}) */

// ---- Server Local - Peticiones

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))

app.use('/api/productos', productRouter)
app.use('/api/carts', cartRouter)
app.use('/upload', multerRouter)



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

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
}) 