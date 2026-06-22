const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bikeclick"
});

db.connect((err) => {

    if(err){
        console.log(
            "Erro ao conectar:",
            err
        );
        return;
    }

    console.log(
        "MySQL conectado!"
    );

});

module.exports = db;