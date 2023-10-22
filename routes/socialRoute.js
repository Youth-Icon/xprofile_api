import {Router} from 'express'
import { createSocials, getSocials, getSocial, deleteSocial, updateSocial, incrementSocialClicks } from '../Controller/SocialController.js'


const router = Router()

router.post('/:id', createSocials)
router.get('/:id', getSocials)
router.get('/:id/:type', getSocial)
router.delete('/:id/:type', deleteSocial)
router.put('/:id/:type', updateSocial)
router.put('/stats/:id/:type', incrementSocialClicks)

export default router