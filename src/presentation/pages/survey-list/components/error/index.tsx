import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/contexts/context'

export function SurveyError (): JSX.Element {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </div>
  )
}
