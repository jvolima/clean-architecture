import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}
