const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  // Lo primero que queremos hacer es poder separar cada url
  /* 
    Para poder mostrar los cambios en caliente podemos hacerlo de dos formas: 
      - ejecutar el fichero con node --watch nombreFichero (recomendada)
       usar nodemon (dependencia a parte, no instalar de forma global)
  */
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('<h1>Contacto</h1>')
  } else if (req.url === '/imagen.jpg') {
    fs.readFile('./imagen.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500 // OK
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.statusCode = 200 // OK
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})