import { SurveyContext } from '@/presentation/pages/survey-list/contexts/context'
import styles from './styles.scss'
import React, { useContext } from 'react'

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
