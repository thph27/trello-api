import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async(req, res, next) => {
  //Validate bat buoc phai co o Back-end vi day la diem cuoi de luu du lieu vao database
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Title is required (thph27)',
      'string.empty': 'Title is not allowed to be empty (thph27)',
      'string.min': 'Title must be at least 3 chars (thph27)',
      'string.max': 'Title max 50 chars (thph27)',
      'string.trim': 'Title must not have leading or trailing whitespace (thph27)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict()

  })

  try {
    // abortEarly: false de truong hop co nhieu error cua validation thi tra ve tat ca
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu hợp lệ xong cho request sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}