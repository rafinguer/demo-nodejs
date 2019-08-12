// Express library
const express = require('express');
const app = express();

// PostgreSQL library
const pg = require('pg');

// Database configuration
const config = {
    host: 'dbwagongo-dev.postgres.database.azure.com',
    user: 'dbwagongodevadm@dbwagongo-dev',
    password: 'DB-W4g0ng0D3v#2019',
    database: 'dbwagongotest',
    port: 5432,
    ssl: true
};
const dbclient = new pg.Client(config);

// Connection to database
dbclient.connect(err => {
    if (err) throw err;
    else {
        console.log("Conexión a base de datos realizada con éxito");
        createTable();

        setInterval(function() {
            queryZip();

            setInterval(function() {
                dbclient.end(console.log("Conexión cerrada"));    
            }, 5000);
            
        }, 5000);
    }
});

function createTable() {
    console.log("Creando tabla 'zip'")
    const qry = `
        DROP TABLE IF EXISTS zip;

        CREATE TABLE zip (
            zip_id VARCHAR(2) UNIQUE NOT NULL,
            region VARCHAR(25) UNIQUE NOT NULL,
            ministry_id VARCHAR(10) UNIQUE NOT NULL,
            PRIMARY KEY (zip_id)
        );

        INSERT INTO zip VALUES ('01', 'Álava', 'VI');
        INSERT INTO zip VALUES ('02', 'Albacete', 'AB');
        INSERT INTO zip VALUES ('03', 'Alicante', 'A');
        INSERT INTO zip VALUES ('04', 'Almería', 'AL');
        INSERT INTO zip VALUES ('05', 'Ávila', 'AV');
        INSERT INTO zip VALUES ('06', 'Badajoz', 'BA');
        INSERT INTO zip VALUES ('07', 'Baleares', 'PM / IB');
        INSERT INTO zip VALUES ('08', 'Barcelona', 'B');
        INSERT INTO zip VALUES ('09', 'Burgos', 'BU');
        INSERT INTO zip VALUES ('10', 'Cáceres', 'CC');
        INSERT INTO zip VALUES ('11', 'Cádiz', 'CA');
        INSERT INTO zip VALUES ('12', 'Castellón', 'CS');
        INSERT INTO zip VALUES ('13', 'Ciudad Real', 'CR');
        INSERT INTO zip VALUES ('14', 'Córdoba', 'CO');
        INSERT INTO zip VALUES ('15', 'Coruña', 'C');
        INSERT INTO zip VALUES ('16', 'Cuenca', 'CU');
        INSERT INTO zip VALUES ('17', 'Gerona', 'GE / GI');
        INSERT INTO zip VALUES ('18', 'Granada', 'GR');
        INSERT INTO zip VALUES ('19', 'Guadalajara', 'GU');
        INSERT INTO zip VALUES ('20', 'Guipúzcoa', 'SS');
        INSERT INTO zip VALUES ('21', 'Huelva', 'H');
        INSERT INTO zip VALUES ('22', 'Huesca', 'HU');
        INSERT INTO zip VALUES ('23', 'Jaén', 'J');
        INSERT INTO zip VALUES ('24', 'León', 'LE');
        INSERT INTO zip VALUES ('25', 'Lérida', 'L');
        INSERT INTO zip VALUES ('26', 'La Rioja', 'LO');
        INSERT INTO zip VALUES ('27', 'Lugo', 'LU');
        INSERT INTO zip VALUES ('28', 'Madrid', 'M');
        INSERT INTO zip VALUES ('29', 'Málaga', 'MA');
        INSERT INTO zip VALUES ('30', 'Murcia', 'MU');
        INSERT INTO zip VALUES ('31', 'Navarra', 'NA');
        INSERT INTO zip VALUES ('32', 'Orense', 'OR / OU');
        INSERT INTO zip VALUES ('33', 'Asturias', 'O');
        INSERT INTO zip VALUES ('34', 'Palencia', 'P');
        INSERT INTO zip VALUES ('35', 'Las Palmas', 'GC');
        INSERT INTO zip VALUES ('36', 'Pontevedra', 'PO');
        INSERT INTO zip VALUES ('37', 'Salamanca', 'SA');
        INSERT INTO zip VALUES ('38', 'Santa Cruz de Tenerife', 'TF');
        INSERT INTO zip VALUES ('39', 'Cantabria (Santander)', 'S');
        INSERT INTO zip VALUES ('40', 'Segovia', 'SG');
        INSERT INTO zip VALUES ('41', 'Sevilla', 'SE');
        INSERT INTO zip VALUES ('42', 'Soria', 'SO');
        INSERT INTO zip VALUES ('43', 'Tarragona', 'T');
        INSERT INTO zip VALUES ('44', 'Teruel', 'TE');
        INSERT INTO zip VALUES ('45', 'Toledo', 'TO');
        INSERT INTO zip VALUES ('46', 'Valencia', 'V');
        INSERT INTO zip VALUES ('47', 'Valladolid', 'VA');
        INSERT INTO zip VALUES ('48', 'Vizcaya (Bilbao)', 'BI');
        INSERT INTO zip VALUES ('49', 'Zamora', 'ZA');
        INSERT INTO zip VALUES ('50', 'Zaragoza', 'Z');
        INSERT INTO zip VALUES ('51', 'Ceuta', 'CE');
        INSERT INTO zip VALUES ('52', 'Melilla', 'ML');
    `;

    dbclient.query(qry)
        .then(()=> {
            console.log("Estructura y carga de datos OK");
        })
        .catch(err => {
            console.log("Error: " + err);
        })
        .then(()=> {
            console.log("Ejecución terminada. Proceso finalizado");
        })
}

function queryZip() {
    console.log("Consultando la tabla 'zip'")

    const qry = "SELECT * FROM zip";

    dbclient.query(qry)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            process.exit();
        })
        .catch(err => {
            console.log("Error executing query '" + qry + "': " + err)
        });
}

// Enables NodeJS Server and enables the / path
var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('WagonGO está vivo!!!'));
app.listen (port, () => console.log("Server is running on port " + port));
