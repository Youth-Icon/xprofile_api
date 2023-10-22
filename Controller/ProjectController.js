import prisma from "../DB/db.config.js";

export const createProject = async (req, res) => {
    const { id } = req.params
    const { userId, title, description, repoLink, webUrl, tags, language } = req.body

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        // Find Project if it exists
        const findProject = await prisma.projects.findFirst({
            where: {
                repoLink: repoLink,
                webUrl: webUrl
            }
        })
        if (findProject) {
            return res.json({ status: 400, message: title + ' project already exists!!' })
        }

        const newProject = await prisma.projects.create({
            data: {
                userId: userId,
                title: title,
                description: description,
                repoLink: repoLink,
                webUrl: webUrl,
                tags: tags,
                language: language
            }
        })
        return res.json({ status: 200, message: title + ' project added to profile!', data: newProject })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

export const getProjects = async (req, res) => {
    const { id } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        const findProjects = await prisma.projects.findMany({
            where: {
                userId: Number(id)
            }
        })
        return res.json({ status: 200, message: 'Projects found!', data: findProjects })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

export const deleteProject = async (req, res) => {
    const { id, projId } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        const findProject = await prisma.projects.findFirst({
            where: {
                id: Number(projId)
            }
        })
        if (!findProject) {
            return res.json({ status: 400, message: 'Project not found!!' })
        }

        const deleteProject = await prisma.projects.delete({
            where: {
                id: Number(projId)
            }
        })
        return res.json({ status: 200, message: 'Project deleted!', data: deleteProject })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

export const updateProject = async (req, res) => {
    const { id, projId } = req.params
    const { userId, title, description, repoLink, webUrl, tags, language } = req.body

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        // Find Project if it exists
        const findProject = await prisma.projects.findFirst({
            where: {
                id: Number(projId)
            }
        })
        if (!findProject) {
            return res.json({ status: 405, message: 'Project doesn\'t exist!!' })
        }

        const updateProject = await prisma.projects.update({
            where: {
                id: Number(projId)
            },
            data: {
                userId: userId,
                title: title,
                description: description,
                repoLink: repoLink,
                webUrl: webUrl,
                tags: tags,
                language: language
            }
        })
        return res.json({ status: 200, message: title + ' project updated!', data: updateProject })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

export const incrementProjectVotes = async (req, res) => {
    const { id, projId } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        const findProject = await prisma.projects.findFirst({
            where: {
                id: Number(projId)
            }
        })
        if (!findProject) {
            return res.json({ status: 400, message: 'Project not found!!' })
        }

        const incrementProject = await prisma.projects.update({
            where: {
                id: Number(projId)
            },
            data: {
                upVote: {
                    increment: 1
                }
            }
        })
        return res.json({ status: 200, message: 'Project votes incremented!', data: incrementProject })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

export const getProjectById = async (req, res) => {
    const { id, projId } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        const findProject = await prisma.projects.findFirst({
            where: {
                id: Number(projId)
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
            return res.json({ status: 400, message: 'Project not found!!' })
        }

        return res.json({ status: 200, message: 'Project found!', data: findProject })
    } catch (error) {
        return res.json({ status: 500, message: 'Internal Server Error!!', error: error })
    }
}

// Get projects by Tags

// Get Projects by Language