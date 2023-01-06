import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidation(faker.database.column())
  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('Should be able to return error if email is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should be able to return falsy if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
