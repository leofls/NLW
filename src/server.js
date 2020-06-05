// @ts-nocheck
const express = require("express")
const server = express()

// configurar pasta publica
server.use(express.static("public"))


// Utilizando o template engine Nunjucks
const nunkucks = require("nunjucks")
nunkucks.configure("src/views",{
    express: server,
    noCache: true
})



//configurar o caminho (ROTAS) da minha aplicação
    // página inicial
    // req = requisição / res= resposta
    server.get("/", (req, res) => {
        return res.render("index.html")
    })

    // página dreate-point
    server.get("/create-point" , (req, res) => {
        return res.render( "create-point.html")
    })

    // página resultados
    server.get("/search" , (req, res) => {
        return res.render( "search-results.html")
    })
// Ligar o servidor na porta 3000
server.listen(3000)
console.log("Server iniciado em http://localhost:3000")