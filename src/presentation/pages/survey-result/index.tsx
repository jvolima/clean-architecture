import styles from './styles.scss'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import FlipMove from 'react-flip-move'
import React, { useEffect, useState } from 'react'
import { useErrorHandler } from '@/presentation/hooks'
import { useHistory } from 'react-router-dom'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export function SurveyResult ({ loadSurveyResult }: Props): JSX.Element {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const reload = (): void => {
    setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))
  }

  const history = useHistory()

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(old => ({ ...old, surveyResult })) })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={styles.contentWrap}>
        { state.surveyResult && (
        <>
          <hgroup>
            <Calendar date={state.surveyResult.date} className={styles.calendarWrap} />
            <h2 data-testid="question">{state.surveyResult.question}</h2>
          </hgroup>
          <FlipMove data-testid="answers" className={styles.answersList}>
            {state.surveyResult.answers.map(answer => (
              <li data-testid="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? styles.active : ''}>
                { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
                <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
                <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
              </li>
            ))}
          </FlipMove>
          <button data-testid="back-button" onClick={() => history.replace('/')}>Voltar</button>
        </>
        )}
        { state.isLoading && <Loading /> }
        { state.error && <Error error={state.error} reload={reload} /> }
      </div>
      <Footer />
    </div>
  )
}
