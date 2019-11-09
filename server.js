const express = require('express')
const http = require('http')
const path = require('path')

const app = express()

const port = process.env.port || 8080

app.use(express.static(__dirname + '/dist/locacao-app'))

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)))

const server = http.createServer(app)

server.listen(port, () => console.log('Running...'))