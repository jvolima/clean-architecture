import { AddAccount } from '@/domain/usecases'
import { makeAxiosHttpClient , makeApiUrl } from '@/main/factories/http'
import { RemoteAddAccount } from '@/data/usecases'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
