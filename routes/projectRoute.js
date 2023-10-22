import {Router} from 'express'
import { createProject, deleteProject, getProjectById, getProjects, incrementProjectVotes, updateProject } from '../Controller/ProjectController.js'


const router = Router()

router.post('/:id', createProject)
router.get('/:id', getProjects)
router.get('/:id/:projId', getProjectById)
router.delete('/:id/:projId', deleteProject)
router.put('/:id/:projId', updateProject)
router.put('/stats/:id/:projId', incrementProjectVotes)

export default router