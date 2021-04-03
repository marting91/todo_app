import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise'

dotenv.config({ path: 'variables.env' })

const schema = process.env.BD_NOMBRE;
const host = process.env.BD_HOST;
const port = process.env.BD_PORT;
const user = process.env.BD_USER;
const password = process.env.BD_PASS;

const connection = await createConnection({ host, port, user, password });
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${schema}\`;`);

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;

