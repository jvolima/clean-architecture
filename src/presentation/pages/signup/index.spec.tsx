import { SignUp } from '.'
import { Helper, ValidationStub } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { AddAccount } from '@/domain/usecases'
import { AddAccountSpy } from '@/domain/test'
import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (name = faker.name.fullName(), email = faker.internet.email(), password = faker.internet.password()): void => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
}

describe('SignUp Component', () => {
  it('Should be able to start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('form-status').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should be able to show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  it('Should be able to show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('Should be able to show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('Should be able to show password confirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should be able to show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
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

  it('Should be able to show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('Should be able to enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('Should show spinner on submit', async () => {
    makeSut()
    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })
  })

  it('Should be able to call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(name, email, password)
    await waitFor(() => {
      expect(addAccountSpy.params).toEqual({
        name,
        email,
        password,
        passwordConfirmation: password
      })
    })
  })

  it('Should be able to call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    await waitFor(() => {
      expect(addAccountSpy.callsCount).toBe(1)
    })
  })

  it('Should not be able to call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('Should be able to present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
      expect(screen.getByTestId('form-status').children).toHaveLength(1)
    })
  })

  it('Should be able to call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    simulateValidSubmit()
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('Should be able to go to login page', async () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/login')
    })
  })
})
