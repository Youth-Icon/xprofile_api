import prisma from '../DB/db.config.js'

export const createLink = async (req, res) => {
    const {id} = req.params
    const { userId, title, url} = req.body
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        // Find Link if it exists
        const findLink = await prisma.links.findFirst({
            where: {
                userId: Number(id),
                url: url
            }
        })
        if (findLink) {
            return res.json({ status: 400, message: url + ' link already exists!!' })
        }

        const newLink = await prisma.links.create({
            data: {
                title,
                url,
                userId
            }
        })
        res.status(201).json({ status: 200, message: title + ' link added to profile!', data: newLink })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getLinks = async (req, res) => {
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
        const links = await prisma.links.findMany({
            where: {
                userId: Number(id)
            }
        })
        return res.json({ status: 200, message: 'Links fetched successfully!!', data: links })
    } catch (error) {
        console.log(error)
    }
}

export const deleteLink = async (req, res) => {
    const { id, linkId } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        const findLink = await prisma.links.findUnique({
            where: {
                id: Number(linkId)
            }
        })
        if (!findLink) {
            return res.json({ status: 404, message: 'Link not found!!' })
        }
        const deleteLink = await prisma.links.delete({
            where: {
                id: Number(linkId)
            }
        })
        return res.json({ status: 200, message: 'Link deleted successfully!!', data: deleteLink })
    } catch (error) {
        console.log(error)
    }
}

export const updateLink = async (req, res) => {
    const { id, linkId } = req.params
    const { title, url } = req.body
    try {

        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }

        const findLink = await prisma.links.findUnique({
            where: {
                id: Number(linkId)
            }
        })
        if (!findLink) {
            return res.json({ status: 404, message: 'Link not found!!' })
        }
        const updateLink = await prisma.links.update({
            where: {
                id: Number(linkId)
            },
            data: {
                title,
                url
            }
        })
        return res.json({ status: 200, message: 'Link updated successfully!!', data: updateLink })
    } catch (error) {
        console.log(error)
    }
}

export const getLink = async (req, res) => {
    const { id, linkId } = req.params
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!findUser) {
            return res.json({ status: 404, message: 'User not found!!' })
        }
        const findLink = await prisma.links.findUnique({
            where: {
                id: Number(linkId)
            }
        })
        if (!findLink) {
            return res.json({ status: 404, message: 'Link not found!!' })
        }
        return res.json({ status: 200, message: 'Link fetched successfully!!', data: findLink })
    } catch (error) {
        console.log(error)
    }
}