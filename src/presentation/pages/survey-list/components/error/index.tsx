import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/contexts/context'

export function SurveyError (): JSX.Element {
  const { state } = useContext(SurveyContext)

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}
