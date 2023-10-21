import {Router} from 'express'
import { createSocials, getSocials, getSocial, deleteSocial, updateSocial } from '../Controller/SocialController.js'


const router = Router()

router.post('/:id', createSocials)
router.get('/:id', getSocials)
router.get('/:id/:type', getSocial)
router.delete('/:id/:type', deleteSocial)
router.put('/:id/:type', updateSocial)

export default router