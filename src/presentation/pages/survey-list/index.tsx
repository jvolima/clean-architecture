import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { SurveyContext } from './contexts/context'
import { SurveyListItem, SurveyError } from './components'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export function SurveyList ({ loadSurveyList }: Props): JSX.Element {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState({ ...state, surveys }) })
      .catch(error => { setState({ ...state, error: error.message }) })
  }, [])

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyError /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
