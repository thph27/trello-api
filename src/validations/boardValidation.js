import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

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
    // console.log('req.body:', req.body)
    // abortEarly: false de truong hop co nhieu error cua validation thi tra ve tat ca
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'Validation: API create new boards' })
  } catch (error) {
    // console.log(error)
    // console.log(newError)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}