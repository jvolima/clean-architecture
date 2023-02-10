import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '.'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyListComponent', () => {
  it('Should be able to present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => { expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4) })
  })

  it('Should be able to call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    await waitFor(() => { expect(loadSurveyListSpy.callsCount).toBe(1) })
  })

  it('Should be able to render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => { expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3) })
  })
})
