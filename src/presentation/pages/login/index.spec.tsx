import React from 'react'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

describe('Login component', () => {
  afterEach(cleanup)

  it('Should be able to start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'form-status', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should be able to show emailError if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should be able to show passwordError if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should be able to show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email')
  })

  it('Should be able to show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password')
  })

  it('Should be able to enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  it('Should be able to call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('Should be able to call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not be able to call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should be able to present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    await waitFor(() => {
      testElementText(sut, 'main-error', error.message)
      Helper.testChildCount(sut, 'form-status', 1)
    })
  })

  it('Should be able to call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => {
      expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('Should be able to present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    await waitFor(() => {
      testElementText(sut, 'main-error', error.message)
      Helper.testChildCount(sut, 'form-status', 1)
    })
  })

  it('Should be able to go to signup page', () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.location.pathname).toBe('/signup')
  })
})
