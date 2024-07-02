/* eslint-disable no-useless-catch */
//
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

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
    //B1: Deep clone board tao ra 1 cai moi de xu li khong anh huong toi board ban dau
    const resBoard = cloneDeep(board)
    // B2 Dua card ve dung column cua no
    resBoard.columns.forEach(column => {
      // objectId trong mongodb co support method .equals
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // Convert ObjectId ve string bang ham toString cua js
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // Xoa mang cards khoi board ban dau
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}
const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails,
  update
}