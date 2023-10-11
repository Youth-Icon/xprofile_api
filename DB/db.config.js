import { PrismaClient } from "@prisma/client";
import { query } from "express";

const prisma = new PrismaClient({
    log: [query, 'imfo', 'warn', 'error']
})

export default prisma
