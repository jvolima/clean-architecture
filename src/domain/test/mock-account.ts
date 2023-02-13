import { faker } from '@faker-js/faker'
import { AccountModel } from '../models'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.fullName()
})
