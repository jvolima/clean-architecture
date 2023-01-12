import { render, RenderResult } from '@testing-library/react'
import { SignUp } from '.'
import React from 'react'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )

  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || 'Tudo certo!')
  expect(field.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('SignUp Component', () => {
  it('Should be able to start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testChildCount(sut, 'form-status', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
