import { Folders } from '../models/Folders.js'
import { Items } from '../models/Items.js'

const home = async (req, res) => {

    try {
        const folders = await Folders.findAll();
        res.render('inicio', {
            pagina: 'Inicio',
            folders
        })
    } catch (error) {
        console.log(error);
    }
}

const saveFolder = async (req, res) => {
    const { folder } = req.body;
    const errors = [];

    if (folder.trim() === '') {
        errors.push('Please enter a value');
        try {
            const folders = await Folders.findAll();
            res.render('inicio', {
                pagina: 'Inicio',
                folders,
                errors
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            await Folders.create({
                nombre: folder
            })
            res.redirect('/')
        } catch (error) {

        }
    }
}

const folder = async (req, res) => {
    const id_folder = req.params.folder;

    const promiseDB = [];
    promiseDB.push(Folders.findOne({ where: { id: id_folder } }))
    promiseDB.push(Items.findAll({
        where: { id_folder },
        include: Folders
    }))


    try {
        const resultado = await Promise.all(promiseDB)
        res.render('folder', {
            tareas: resultado[1],
            id_folder,
            folder: resultado[0].nombre
        })
    } catch (error) {
        console.log(error);
    }
}

const saveItem = async (req, res) => {
    const { item, id_folder } = req.body;
    console.log(item)
    console.log(id_folder)

    const errors = [];

    if (item.trim() === '') {
        errors.push('Please enter a value');
        try {
            const tareas = await Items.findAll({
                where: { id_folder },
                include: Folders
            });
            const folder = tareas[0].folder.nombre
            res.render('folder', {
                tareas,
                id_folder,
                folder,
                errors
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            await Items.create({
                tarea: item,
                id_folder
            })
            res.redirect(`/${id_folder}`)
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteItem = async (req, res) => {
    const { folder, tarea_id } = req.params;

    try {
        Items.destroy({
            where: {
                id: tarea_id
            }
        });
        res.redirect(`/${folder}`)
    } catch (error) {
        console.log(error);
    }
}

const deleteFolder = async (req, res) => {
    const { folder } = req.params;

    try {
        Folders.destroy({
            where: {
                id: folder
            }
        });
        res.redirect(`/`)
    } catch (error) {
        console.log(error);
    }
}

export { home, folder, saveFolder, saveItem, deleteItem, deleteFolder }