import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpGetClientDecoratorFactory } from '@/main/factories/decorators'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecoratorFactory())
}
