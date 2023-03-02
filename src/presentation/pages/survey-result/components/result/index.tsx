import styles from './styles.scss'
import { Calendar } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { LoadSurveyResult } from '@/domain/usecases'

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
      <FlipMove data-testid="answers" className={styles.answersList}>
        {surveyResult.answers.map(answer => (
          <li data-testid="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? styles.active : ''}>
            { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
            <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
            <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
          </li>
        ))}
      </FlipMove>
      <button className={styles.button} data-testid="back-button" onClick={() => history.replace('/')}>Voltar</button>
    </>
  )
}
