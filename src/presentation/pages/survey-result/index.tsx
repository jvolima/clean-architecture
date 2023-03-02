import styles from './styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from './components'
import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(old => ({ ...old, surveyResult })) })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={styles.contentWrap}>
        { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
        { state.isLoading && <Loading /> }
        { state.error && <Error error={state.error} reload={reload} /> }
      </div>
      <Footer />
    </div>
  )
}
