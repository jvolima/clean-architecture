import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new EmailValidation(field)
  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('Should be able to return error if email is invalid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if email is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  it('Should be able to return falsy if email is empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
