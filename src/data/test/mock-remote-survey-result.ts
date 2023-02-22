import { faker } from '@faker-js/faker'
import { RemoteLoadSurveyResult } from '../usecases'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.datatype.datetime().toISOString(),
  answers: [{
    image: faker.internet.url(),
    count: faker.datatype.number(),
    answer: faker.random.word(),
    percent: faker.datatype.number({ min: 0, max: 100 })
  }, {
    count: faker.datatype.number(),
    answer: faker.random.word(),
    percent: faker.datatype.number({ min: 0, max: 100 })
  }]
})
