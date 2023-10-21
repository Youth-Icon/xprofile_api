import prisma from '../DB/db.config.js'

export const createUsers = async (req, res) => {
    const {name, username, email, github, bannerColor} = req.body

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                
                username: username
            }
        })

        if (findUser) {
            return res.json({status: 409, message: 'Username already taken!!'})
        }

        const newUser = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                github: github,
                bannerColor: bannerColor,

            }
        })
        return res.json({status: 200, message: 'User created successfully!!', data: newUser})
    } catch (error) {
        
    }
}