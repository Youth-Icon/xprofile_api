import { Router } from "express";
import UserRoutes from './userRoute.js'

const router = Router()

router.use('/v1/register', UserRoutes)
router.use('/v1/users', UserRoutes)
router.use('/v1/user', UserRoutes)
router.use('/v1/DNdelete', UserRoutes)
router.use('/v1/DNupdate', UserRoutes)

export default router