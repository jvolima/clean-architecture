import { faker } from '@faker-js/faker'
import * as Helper from './http-mocks'

export const mockInvalidCredentialsError = (): void => { Helper.mockInvalidCredentialsError(/login/) }

export const mockUnexpectedError = (): void => { Helper.mockUnexpectedError(/login/, 'POST') }

export const mockOk = (): void => { Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.fullName() }) }

export const mockInvalidData = (): void => { Helper.mockOk(/login/, 'POST', { invalid: faker.datatype.uuid() }) }
