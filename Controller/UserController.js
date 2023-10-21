import prisma from '../DB/db.config.js'

export const createUsers = async (req, res) => {
    const {name, username, email, github, bannerColor, about, profession} = req.body

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
            return res.json({status: 409, message: 'Username already taken!!'})
        }
        if (findEmail) {
            return res.json({status: 408, message: 'Email already taken!!'})
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
                avatar: "https://avatars.githubusercontent.com/"+github,
            }
        })
        return res.json({status: 200, message: 'User created successfully!!', data: newUser})
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.json({status: 200, message: 'Users fetched successfully!!', xprofiles: users.length, data: users})
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Socials: true
            }
        })

        if (!user) {
            return res.json({status: 404, message: 'User not found!!'})
        }
        return res.json({status: 200, message: 'User fetched successfully!!', data: user})
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params
    const {name, email, github, bannerColor, about, profession} = req.body
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({status: 404, message: 'User not found!!'})
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
                avatar: "https://avatars.githubusercontent.com/"+github,
            }
        })
        return res.json({status: 200, message: 'User updated successfully!!', data: updatedUser})
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({status: 404, message: 'User not found!!'})
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return res.json({status: 200, message: 'User deleted successfully!!', data: deletedUser})
    } catch (error) {
        console.log(error)
    }
}