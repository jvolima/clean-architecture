import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('Should be able to call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  it('Should be able to throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response.statusCode = HttpStatusCode.forbidden
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
