import styles from './styles.scss'
import { Footer, Header, Spinner } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React from 'react'

export function SurveyResult (): JSX.Element {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
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
        <div className={styles.loadingWrap}>
          <div className={styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
