const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// Hace lo mismo que lo comentado de abajo
app.use(express.json())

// middleware
/* app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llega request que son POST y que tienen el header application/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // mutar la request y meter la información en el req.body
    req.body = data
    next()
  })
}) */

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi página</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// Tiene que estar la última porque comprueba las direcciones por orden
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
