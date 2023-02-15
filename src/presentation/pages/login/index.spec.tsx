import { Login } from '@/presentation/pages'
import { ValidationStub, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'
import { AuthenticationSpy } from '@/domain/test'
import React from 'react'
import { faker } from '@faker-js/faker'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  validationStub.errorMessage = params?.validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
}

describe('Login component', () => {
  it('Should be able to start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('form-status').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  it('Should be able to show emailError if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('Should be able to show passwordError if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('Should be able to show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('Should be able to show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('Should be able to enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('Should show spinner on submit', async () => {
    makeSut()
    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })
  })

  it('Should be able to call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({ email, password })
    })
  })

  it('Should be able to call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    await waitFor(() => {
      expect(authenticationSpy.callsCount).toBe(1)
    })
  })

  it('Should not be able to call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('Should be able to present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
      expect(screen.getByTestId('form-status').children).toHaveLength(1)
    })
  })

  it('Should be able to call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    simulateValidSubmit()
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('Should be able to go to signup page', async () => {
    makeSut()
    const signupLink = screen.getByTestId('signup-link')
    fireEvent.click(signupLink)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/signup')
    })
  })
})
