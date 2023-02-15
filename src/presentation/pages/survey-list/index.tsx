import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext } from './contexts/context'
import { SurveyListItem, SurveyError } from './components'
import styles from './styles.scss'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList ({ loadSurveyList }: Props): JSX.Element {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState({ ...state, surveys }) })
      .catch(error => { setState({ ...state, error: error.message }) })
  }, [state.reload])

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
