import { AccountModel } from '../models'
import { faker } from '@faker-js/faker'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.fullName()
})
