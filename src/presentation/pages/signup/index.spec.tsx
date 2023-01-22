import { cleanup, render, RenderResult } from '@testing-library/react'
import { SignUp } from '.'
import { Helper, ValidationStub } from '@/presentation/test'
import React from 'react'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp validation={validationStub} />
  )

  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  it('Should be able to start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'form-status', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('Should be able to show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  it('Should be able to show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should be able to show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should be able to show password confirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
