import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { faker } from '@faker-js/faker'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.datatype.datetime().toISOString(),
  didAnswer: faker.datatype.boolean()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
])
