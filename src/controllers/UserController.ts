import { deleteUserById, getUserById, getUsers } from '../db/userSchema';
import express from 'express'
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params
        const deletedUser = await deleteUserById(id)
        res.status(200).json(deleteUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { username } = req.body
        if (!username) {
            return res.sendStatus(400)
        }
        const user = await getUserById(id)
        user.username = username
        await user.save()
        res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
