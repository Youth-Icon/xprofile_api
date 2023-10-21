import { Router } from "express";
import UserRoutes from './userRoute.js'
import SocialRoute from './socialRoute.js'

const router = Router()

router.use('/v1/profile', UserRoutes)

router.use('/v1/socials', SocialRoute)

export default router