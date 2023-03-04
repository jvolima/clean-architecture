import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'
import { faker } from '@faker-js/faker'
import { mockSaveSurveyResultParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should be able to call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response.body = mockRemoteSurveyResultModel()
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
  })
})
