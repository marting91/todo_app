import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Folders = db.define('folders', {
    nombre: {
        type: Sequelize.STRING
    }
})