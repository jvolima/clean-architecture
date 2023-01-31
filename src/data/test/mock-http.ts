import { HttpPostParams , HttpPostClient, HttpResponse, HttpStatusCode } from '../protocols/http'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.internet.email()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}
