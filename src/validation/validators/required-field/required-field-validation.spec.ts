import { RequiredFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from './required-field-validation'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation(faker.database.column())
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('Should be able to return error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should be able to return falsy if field is not empty', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
