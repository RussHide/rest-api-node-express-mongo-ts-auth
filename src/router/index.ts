import express from 'express'

import authentication from './authRouter'
import usersRouter from './usersRouter'

const router = express.Router()

export default ():express.Router => {
    authentication(router)
    usersRouter(router)
    return router
}