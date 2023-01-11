import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(faker.database.column(), valueToCompare)
}

describe('CompareFieldsValidation', () => {
  it('Should be able to return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if compare is valid', () => {
    const value = faker.random.word()
    const sut = makeSut(value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
