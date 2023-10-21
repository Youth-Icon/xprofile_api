import {Router} from 'express'
import { createUsers, getUsers, getUser, deleteUser, updateUser } from '../Controller/UserController.js'


const router = Router()

router.post('/', createUsers)
router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

export default router