import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyContext } from './contexts/context'
import { SurveyListItem, SurveyError } from './components'
import styles from './styles.scss'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList ({ loadSurveyList }: Props): JSX.Element {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState(old => ({ ...old, surveys })) })
      .catch(handleError)
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
