// // importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// // Criar o objeto de banco de dados que irá fazer operaçoes no banco de dados
const  db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// // utilizar o objeto de banco de dados para nossas operaçoes 
// db.serialize(()=> {
// // com comandos SQL eu vou:

//     // 1. criar uma tabela
//         db.run(
//             `CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 image TEXT,
//                 name TEXT,
//                 address TEXT,
//                 address2 TEXT,
//                 state TEXT,
//                 city TEXT,
//                 items TEXT
//             );`
//         )
       
//     // 2. inserir
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items            
//     ) VALUES ( ?,?,?,?,?,?,? );`

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Paper side",
//         "Guilherme Gemballa, Jardim América",
//         "Numero 160",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papeis e papelão"
//     ]

//     // função para depois que inserir dados verificar se tem erro
//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("cadstrado com sucesso!")
//         console.log(this)
//     }

//     db.run( query, values, afterInsertData)
    
//     // 3. consultar 
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão os seus registes: ")
    //     console.log(rows)
    // })

//     // 4. deletar
    // db.run(` DELETE FROM places WHERE id = ? `, [3], function(err) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com suceso")
    // })

    
    // 5. atualizar
        //  db.run(` UPDATE places set name = "Paper Sider" WHERE id = ? `, [3], function(err) {
        //     if(err){
        //         return console.log(err)
        //     }
    
        //     console.log("Registro Alterado com suceso!")
        // })
// })