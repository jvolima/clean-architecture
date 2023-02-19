import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { MinLengthValidation } from './min-length-validation'

type SutTypes = {
  sut: MinLengthValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new MinLengthValidation(field, 5)
  return {
    sut
  }
}

describe('MinLengthValidation', () => {
  it('Should be able to return error if value is invalid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if value is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  it('Should be able to return falsy if field does not exists in schema', () => {
    const { sut } = makeSut('any_field')
    const error = sut.validate({ invalidField: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  it('Should be able to return falsy if field value is null', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: null })
    expect(error).toBeFalsy()
  })
})
