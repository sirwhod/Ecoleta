const express = require("express")
const server = express()

//Configurar Pasta Pública
server.use(express.static("public"))

// Configurar caminhos da Aplicação
// Página Inicial
// req = Requisição
// res = Resposta

//Página Inicial
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

//Create-Point
server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

//search-results
server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})

//Ligar o servidor
server.listen(3000) //uma função que vai ligar o servidor na porta 3000
