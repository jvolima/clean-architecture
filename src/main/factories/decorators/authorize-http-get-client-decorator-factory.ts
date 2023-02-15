import { HttpGetClient } from '@/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeAuthorizeHttpGetClientDecoratorFactory = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
