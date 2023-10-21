import { Router } from "express";
import UserRoutes from './userRoute.js'

const router = Router()

router.use('/register', UserRoutes)

export default router