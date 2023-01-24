import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('Should be able to return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('Should be able to return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  it('Should be able to return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = Number(faker.random.numeric())
    const validations = sut.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  it('Should be able to return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  it('Should be able to return a list of validations', () => {
    const field = faker.database.column()
    const length = Number(faker.random.numeric())
    const validations = sut.field(field).required().min(length).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
