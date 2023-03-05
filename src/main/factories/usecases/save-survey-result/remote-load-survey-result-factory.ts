import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecoratorFactory } from '@/main/factories/decorators'
import { SaveSurveyResult } from '@/domain/usecases'
import { RemoteSaveSurveyResult } from '@/data/usecases'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecoratorFactory())
}
