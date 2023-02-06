import { faker } from '@faker-js/faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void => { Helper.mockEmailInUseError(/signup/) }

export const mockUnexpectedError = (): void => { Helper.mockUnexpectedError(/signup/, 'POST') }

export const mockOk = (): void => { Helper.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.fullName() }) }

export const mockInvalidData = (): void => { Helper.mockOk(/signup/, 'POST', { invalid: faker.datatype.uuid() }) }
