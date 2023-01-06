import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { MinLengthValidation } from './min-length-validation'

type SutTypes = {
  sut: MinLengthValidation
}

const makeSut = (): SutTypes => {
  const sut = new MinLengthValidation(faker.database.column(), 5)
  return {
    sut
  }
}

describe('MinLengthValidation', () => {
  it('Should be able to return error if value is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
