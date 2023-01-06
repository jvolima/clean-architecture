import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  it('Should be able to return error if value is invalid', () => {
    const sut = new MinLengthValidation(faker.database.column(), 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if value is valid', () => {
    const sut = new MinLengthValidation(faker.database.column(), 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
