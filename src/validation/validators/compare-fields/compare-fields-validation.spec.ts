import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(faker.database.column())
}

describe('CompareFieldsValidation', () => {
  it('Should be able to return error if compare is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
