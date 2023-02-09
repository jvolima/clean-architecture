import React from 'react'
import { Footer, Header } from '@/presentation/components'
import styles from './styles.scss'
import { SurveyItemEmpty } from './components'

export function SurveyList (): JSX.Element {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}
