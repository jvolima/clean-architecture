import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpGetClientDecoratorFactory } from '@/main/factories/decorators'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecoratorFactory())
}
