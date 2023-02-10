import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from '.'

describe('SurveyItem Component', () => {
  it('Should be able to render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2023-02-10T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('fev')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
