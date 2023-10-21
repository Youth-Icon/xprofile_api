import {Router} from 'express'
import { createUsers } from '../Controller/UserController.js'


const router = Router()

router.post('/register', createUsers)

export default router