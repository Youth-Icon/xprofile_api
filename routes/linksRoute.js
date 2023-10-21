import {Router} from 'express'
import { createLink, deleteLink, getLinks, updateLink, getLink } from '../Controller/LinksController.js'


const router = Router()

router.post('/:id', createLink)
router.get('/:id', getLinks)
router.get('/:id/:linkId', getLink)
router.delete('/:id/:linkId', deleteLink)
router.put('/:id/:linkId', updateLink)

export default router