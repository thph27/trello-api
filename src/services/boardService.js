/* eslint-disable no-useless-catch */
//
import { slugify } from '~/utils/formatters'

const createNew = async ( reqBody ) => {
  try {
    // Xu li logic du lieu tuy dac thu
    const newBoard = {
      ...reqBody,
      // xoa dấu và thêm gạch ngang giữa các từ
      slug: slugify(reqBody.title)
      // Goi toi tang Model de xu li luu ban ghi newBoard vao trong Database
    }
    // Trong service luon phai co return
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}