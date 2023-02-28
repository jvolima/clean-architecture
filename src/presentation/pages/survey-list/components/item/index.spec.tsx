import { mockSurveyModel } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases'
import { IconName } from '@/presentation/components'
import { SurveyItem } from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import React from 'react'

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (survey: LoadSurveyList.Model): void => {
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )
}

describe('SurveyItem Component', () => {
  it('Should be able to render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2023-02-23T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('23')
    expect(screen.getByTestId('month')).toHaveTextContent('fev')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  it('Should be able to render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-01-03T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  it('Should be able to go to SurveyResult', () => {
    const survey = mockSurveyModel()
    makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
