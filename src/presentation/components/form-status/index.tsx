import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '../spinner'
import styles from './styles.scss'

export function FormStatus (): JSX.Element {
  const { isLoading, errorMessage } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { errorMessage && <span className={styles.error}>{errorMessage}</span> }
    </div>
  )
}
