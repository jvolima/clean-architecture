import styles from './styles.scss'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React from 'react'

export function SurveyResult (): JSX.Element {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div className={styles.contentWrap}>
        { false && (
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
        { false && <Loading /> }
      </div>
      <Footer />
    </div>
  )
}
