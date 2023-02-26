import styles from './styles.scss'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import FlipMove from 'react-flip-move'
import React, { useState } from 'react'

export function SurveyResult (): JSX.Element {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={styles.contentWrap}>
        { state.surveyResult && (
        <>
          <hgroup>
            <Calendar date={new Date()} className={styles.calendarWrap} />
            <h2>Qual é seu framework web favorito?</h2>
          </hgroup>
          <FlipMove className={styles.answersList}>
            <li>
              <img src="https://logospng.org/download/react/logo-react-1024.png" />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percent}>50%</span>
            </li>
            <li className={styles.active}>
              <img src="https://logospng.org/download/react/logo-react-1024.png" />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percent}>50%</span>
            </li>
            <li>
              <img src="https://logospng.org/download/react/logo-react-1024.png" />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percent}>50%</span>
            </li>
          </FlipMove>
          <button>Voltar</button>
        </>
        )}
        { state.isLoading && <Loading /> }
        { state.error && <Error error={state.error} reload={() => {}} /> }
      </div>
      <Footer />
    </div>
  )
}
