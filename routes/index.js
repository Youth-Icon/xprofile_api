import { Router } from "express";
import UserRoutes from './userRoute.js'
import SocialRoute from './socialRoute.js'
import LinksRoute from './linksRoute.js'
import ProjectRoute from './projectRoute.js'

const router = Router()

router.use('/v1/profiles', UserRoutes)

router.use('/v1/socials', SocialRoute)

router.use('/v1/links', LinksRoute)

router.use('/v1/projects', ProjectRoute)

export default router