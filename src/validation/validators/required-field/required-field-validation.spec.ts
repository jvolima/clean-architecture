import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('Should be able to return error if field is empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should be able to return falsy if field is not empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
