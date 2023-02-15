import { AddAccount } from '../usecases'
import { mockAccountModel } from './mock-account'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  callsCount = 0
  params: AddAccount.Params

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
