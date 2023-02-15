import { GetStorage } from '../protocols/cache'
import { faker } from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  key: string
  value: any = faker.random.word()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
