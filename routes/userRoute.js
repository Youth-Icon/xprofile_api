import {Router} from 'express'
import { createUsers, getUsers, getUser, deleteUser, updateUser } from '../Controller/UserController.js'


const router = Router()

router.post('/', createUsers)
router.get('/', getUsers)
router.get('/:username', getUser)
router.delete('/:username', deleteUser)
router.put('/:username', updateUser)

export default router