import express from 'express';
import { home, folder, saveFolder, saveItem, deleteItem, deleteFolder } from '../controllers/inicioController.js';

const router = express.Router();

router.get('/', home)
router.post('/', saveFolder)
router.get('/:folder', folder)
router.get('/:folder/delete', deleteFolder)
router.post('/:folder', saveItem)
router.get('/:folder/:tarea_id', deleteItem)

export default router;