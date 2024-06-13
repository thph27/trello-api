import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoutes'


const Router = express.Router()
// Check API v1
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 are ready to use' })
})
// Board API
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router