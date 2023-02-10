import { SurveyModel } from '@/domain/models'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from '.'

const makeSut = (survey: SurveyModel): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  it('Should be able to render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2023-02-10T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('fev')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
