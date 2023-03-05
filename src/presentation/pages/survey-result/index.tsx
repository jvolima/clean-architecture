import styles from './styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultContext, SurveyResultData } from './components'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export function SurveyResult ({ loadSurveyResult, saveSurveyResult }: Props): JSX.Element {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message, isLoading: false }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => { setState(old => ({ ...old, isLoading: false, surveyResult })) })
      .catch(handleError)
  }

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
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={styles.contentWrap}>
          { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
          { state.isLoading && <Loading /> }
          { state.error && <Error error={state.error} reload={reload} /> }
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}
