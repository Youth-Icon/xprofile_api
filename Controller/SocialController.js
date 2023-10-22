import prisma from '../DB/db.config.js'

export const createSocials = async (req, res) => {
    const {id} = req.params
    const { userId, type, handle } = req.body

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        // Find SOcial if it exists
        const findSocial = await prisma.socials.findFirst({
            where: {
                userId: Number(id),
                type: type
            }
        })
        if (findSocial) {
            return res.json({ status: 400, message: type + ' social already exists!!' })
        }


        const newSocial = await prisma.socials.create({
            data: {
                userId: userId,
                type: type,
                handle: handle,
            }
        })
        return res.json({ status: 200, message: type + ' social added to profile!', data: newSocial })
    } catch (error) {
        console.log(error)
    }
}

export const getSocials = async (req, res) => {
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
        const socials = await prisma.socials.findMany({
            where: {
                userId: Number(id)
            }
        })
        return res.json({ status: 200, message: 'Socials fetched successfully!!', data: socials })
    } catch (error) {
        console.log(error)
    }
}

// get Single Social
export const getSocial = async (req, res) => {
    const { id, type } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        const social = await prisma.socials.findFirst({
            where: {
                userId: Number(id),
                type: type
            }
        })
        if (!social) {
            return res.json({ status: 404, message: 'Social not found!! (hint: use TYPE query)' })
        }
        return res.json({ status: 200, message: 'Social fetched successfully!!', data: social })
    } catch (error) {
        console.log(error)
    }
}

export const deleteSocial = async (req, res) => {
    const { id, type } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        const social = await prisma.socials.deleteMany({
            where: {
                userId: Number(id),
                type: type
            }
        })
        return res.json({ status: 200, message: 'Social deleted successfully!!' })
    } catch (error) {
        console.log(error)
    }
}

export const updateSocial = async (req, res) => {
    const { id, type } = req.params
    const { handle } = req.body
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        const social = await prisma.socials.updateMany({
            where: {
                userId: Number(id),
                type: type
            },
            data: {
                handle: handle
            }
        })
        return res.json({ status: 200, message: 'Social updated successfully!!' })
    } catch (error) {
        console.log(error)
    }
}

// increment social clicks by 1
export const incrementSocialClicks = async (req, res) => {
    const { id, type } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        const social = await prisma.socials.updateMany({
            where: {
                userId: Number(id),
                type: type
            },
            data: {
                clicks: {
                    increment: 1
                }
            }
        })
        return res.json({ status: 200, message: 'Social clicks incremented successfully!!', data: social })
    } catch (error) {
        console.log(error)
    }
}