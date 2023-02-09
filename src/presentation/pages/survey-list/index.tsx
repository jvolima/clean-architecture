import React, { useEffect } from 'react'
import { Footer, Header } from '@/presentation/components'
import styles from './styles.scss'
import { SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export function SurveyList ({ loadSurveyList }: Props): JSX.Element {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll()
    })()
  }, [])

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
