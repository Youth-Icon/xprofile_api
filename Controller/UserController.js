import prisma from '../DB/db.config.js'

export const createUsers = async (req, res) => {
    const { name, username, email, github, bannerColor, about, profession } = req.body

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        const findEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (findUser) {
            return res.json({ status: 409, message: 'Username already taken!!' })
        }
        if (findEmail) {
            return res.json({ status: 408, message: 'Email already taken!!' })
        }

        const newUser = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                github: github,
                bannerColor: bannerColor,
                about: about,
                profession: profession,
                avatar: "https://avatars.githubusercontent.com/" + github,
            }
        })
        return res.json({ status: 200, message: 'User created successfully!!', data: newUser })
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 10
        
        if (page <= 0) {
            page = 1
        }
        if (limit <= 0 || limit > 20) {
            limit = 10
        }
        const offset = (page - 1) * limit
        const users = await prisma.user.findMany({
            skip: offset,
            take: limit,
            select: {
                _count: {
                    select: {
                        Socials: true,
                        Links: true,
                        Projects: true
                    },
                },
                id: true,
                name: true,
                username: true,
                email: true,
                github: true,
                bannerColor: true,
                about: true,
                profession: true,
                avatar: true,
                createdAt: true
            }
        });

        // get current user count
        const tCount = await prisma.user.count()
        const totalPages = Math.ceil(tCount / limit)
        return res.json({ status: 200, xprofiles: users.length, data: users, meta: {
            totalPages, currentPage: page, limit: limit
        } })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                github: true,
                bannerColor: true,
                about: true,
                profession: true,
                avatar: true,
                createdAt: true,
                Socials: {
                    select: {
                        id: true,
                        type: true,
                        handle: true
                    }
                },
                Links: {
                    select: {
                        id: true,
                        title: true,
                        url: true
                    }
                },
                Projects: true
            }

        })

        if (!user) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        return res.json({ status: 200, message: 'User fetched successfully!!', data: user })
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, github, bannerColor, about, profession } = req.body
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                email: email,
                github: github,
                bannerColor: bannerColor,
                about: about,
                profession: profession,
                avatar: "https://avatars.githubusercontent.com/" + github,
            }
        })
        return res.json({ status: 200, message: 'User updated successfully!!', data: updatedUser })
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
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
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return res.json({ status: 200, message: 'User deleted successfully!!', data: deletedUser })
    } catch (error) {
        console.log(error)
    }
}