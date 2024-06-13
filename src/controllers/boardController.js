import { StatusCodes } from 'http-status-codes'


const createNew = async(req, res, next) => {
  try {

    // Dieu huong du lieu sang tang service

    // Co ket qua thi tra ve phia client
    res.status(StatusCodes.CREATED).json({ message: 'Controller: API create new boards' })
  } catch (error) { next(error) }
}


export const boardController = {
  createNew
}