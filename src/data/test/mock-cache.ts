import { faker } from '@faker-js/faker'
import { GetStorage } from '../protocols/cache'

export class GetStorageSpy implements GetStorage {
  key: string
  value = faker.random.word()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
