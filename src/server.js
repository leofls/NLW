// @ts-nocheck
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded( {extended: true}))

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
        // req.query é a query string da nossa URL
        console.log(req.query)
        return res.render( "create-point.html")
    })
    
    server.post("/savepoint" , (req, res) => {
        // req.body = o corpo do nosso formulario
        // console.log(req.body)

        // inserir dados no banco de dados
            const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items            
    ) VALUES ( ?,?,?,?,?,?,? );`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items    

    ]

    // função para depois que inserir dados verificar se tem erro
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("cadstrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run( query, values, afterInsertData)
    

    })

    // página resultados
    server.get("/search" , (req, res) => {

        const search = req.query.search
        if(search ==""){
            // pesquisa vazia
             // mostrar a pagina HTML com os dados do banco
             return res.render( "search-results.html", { total: 0})

        }

        // pegar dados do banco de dados 
        db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function(err, rows) {
                if(err){
                    return console.log(err)
                }        
                console.log("Aqui estão os seus registes: ")
                console.log(rows)
                const total = rows.length
                // mostrar a pagina HTML com os dados do banco
                return res.render( "search-results.html", { places: rows, total})
        })
    })
// Ligar o servidor na porta 3000
server.listen(3000)
console.log("Server iniciado em http://localhost:3000")