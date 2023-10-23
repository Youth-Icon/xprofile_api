import prisma from "../DB/db.config.js";

export const getAllProjects = async (req, res) => {
    let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 10
        
        if (page <= 0) {
            page = 1
        }
        if (limit <= 0 || limit > 20) {
            limit = 10
        }
        const offset = (page - 1) * limit
    try {
        const allProjects = await prisma.projects.findMany({
            skip: offset,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        })
        const tCount = await prisma.user.count()
        const totalPages = Math.ceil(tCount / limit)
        return res.json({ status: 200, data: allProjects, meta: {
            totalPages, currentPage: page, limit: limit
        } })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

export const getProjectByTag = async (req, res) => {
    const { tag } = req.params
    try {
        const findProject = await prisma.projects.findMany({
            where: {
                tags: {
                    has: tag,
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        })
        if (!findProject) {
            return res.json({ status: 404, message: 'Project not found!!' })
        }
        return res.json({ status: 200, data: findProject })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}