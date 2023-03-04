import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '@/data/test'
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>()
  const sut = new RemoteAuthentication(url, httpClientSpy) // sut = System under test

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('Should be able to call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(authenticationParams)
  })

  it('Should be able to throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should be able to throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should be able to throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should be able to throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should be able to return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResult = mockAuthenticationModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthenticationParams())
    expect(account).toEqual(httpResult)
  })
})
