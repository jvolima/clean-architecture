import styles from './styles.scss'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswer } from '../answer'
import { useHistory } from 'react-router-dom'
import React from 'react'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

export function SurveyResultData ({ surveyResult }: Props): JSX.Element {
  const history = useHistory()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={styles.answersList}>
        {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer} />)}
      </ul>
      <button className={styles.button} data-testid="back-button" onClick={() => history.replace('/')}>Voltar</button>
    </>
  )
}
