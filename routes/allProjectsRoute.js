import {Router} from 'express'
import { getAllProjects, getProjectByTag } from '../Controller/AllProjectsController.js'


const router = Router()

router.get('/', getAllProjects)
router.get('/:tag', getProjectByTag)

export default router