import Sequelize from 'sequelize';
import db from '../config/db.js';
import { Folders } from './Folders.js'

export const Items = db.define('items', {
    tarea: {
        type: Sequelize.STRING
    },
    id_folder: {
        type: Sequelize.INTEGER
    }
})

Items.belongsTo(Folders, { foreignKey: 'id_folder', onDelete: 'cascade', constraints: false });
Folders.hasMany(Items, { onDelete: 'cascade', constraints: false })