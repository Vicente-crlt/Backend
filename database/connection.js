const mysql = require("mysql2/promise");

const db = mysql.createPool({

     host: "reseau.proxy.rlwy.net",
    port: 32650,
    user: "root",
    password: "vHTikQqHAcotfWeNpNZAkkAukaKlFopb",
    database: "railway"

    waitForConnections: true,

    connectionLimit: 10

});

module.exports = db;
