import { Router } from "express";
import UserRoutes from './userRoute.js'
import SocialRoute from './socialRoute.js'
import LinksRoute from './linksRoute.js'

const router = Router()

router.use('/v1/profile', UserRoutes)

router.use('/v1/socials', SocialRoute)

router.use('/v1/links', LinksRoute)

export default router