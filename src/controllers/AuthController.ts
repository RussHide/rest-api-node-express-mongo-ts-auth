import { authentication, random } from './../helpers/index';
import { createUser, getUserByEmail, getUserById } from '../db/userSchema'
import express from 'express'


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, passowrd } = req.body
        if (!email || !passowrd) {
            return res.sendStatus(400)
        }


        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if (!user) {
            return res.sendStatus(400)
        }
        const expectedHash = authentication(user.authentication.salt, passowrd)
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403)
        }
        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()
        res.cookie('FABIAN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'})
        return res.sendStatus(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.sendStatus(400)
        }
        const salt = random()
        const user = await createUser({
            email,
            username,
            authentication: {
                salt, password: authentication(salt, password)
            }
        })
        return res.status(200).json(user).end()
    } catch (error) {

        console.log(error)
        return res.sendStatus(400)
    }
}