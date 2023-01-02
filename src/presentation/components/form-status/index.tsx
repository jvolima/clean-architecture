import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '../spinner'
import styles from './styles.scss'

export function FormStatus (): JSX.Element {
  const { state: { isLoading }, errorState: { main } } = useContext(FormContext)

  return (
    <div data-testid="form-status" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { main && <span className={styles.error}>{main}</span> }
    </div>
  )
}
