const express = require("express")
const server = express()

//Configurar Pasta Pública
server.use(express.static("public"))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



// Configurar caminhos da Aplicação
// Página Inicial
// req = Requisição
// res = Resposta

//Página Inicial
server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um titulo"})
})

//Create-Point
server.get("/create-point", (req, res) => {
   return res.render("create-point.html")
})

//search-results
server.get("/search-results", (req, res) => {
   return res.render("search-results.html")
})

//Ligar o servidor
server.listen(3000) //uma função que vai ligar o servidor na porta 3000
