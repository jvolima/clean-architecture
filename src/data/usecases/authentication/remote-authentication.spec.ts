import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"

describe('RemoteAuthentication', () => {
  it('Should be able to call HttpPostClient with correct URL', async () => {
    const url = 'any_url'

    const httpPostClientSpy = new HttpPostClientSpy()

    const sut = new RemoteAuthentication(url, httpPostClientSpy) //sut = System under test
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})