/* eslint-disable no-useless-catch */
//
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async ( reqBody ) => {
  try {
    // Xu li logic du lieu tuy dac thu
    const newBoard = {
      ...reqBody,
      // xoa dấu và thêm gạch ngang giữa các từ
      slug: slugify(reqBody.title)
    }
    // Goi toi tang Model de xu li luu ban ghi newBoard vao trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    // Lay ban ghi Board sau khi goi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // // Trong service luon phai co return
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}