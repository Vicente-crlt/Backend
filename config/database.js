const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "reseau.proxy.rlwy.net",
    port: 32650,
    user: "root",
    password: "vHTikQqHAcotfWeNpNZAkkAukaKlFopb",
    database: "railway"
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
