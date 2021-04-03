import express from 'express';
import db from './config/db.js'
import router from './routes/router.js'

const app = express();

// Conectar la base de datos

db.authenticate()
    .then(() => console.log("Base de datos conectada"))
    .catch(error => console.log(error))


db.sync();

// Habilitar PUG
app.set('view engine', 'pug');

// Para leer datos del form
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Arranco el servidor
app.listen(4000, () => {
    console.log("Servidor funconando");
})