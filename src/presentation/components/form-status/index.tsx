import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '../spinner'
import styles from './styles.scss'

export function FormStatus (): JSX.Element {
  const { state: { isLoading, mainError } } = useContext(FormContext)

  return (
    <div data-testid="form-status" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { mainError && <span className={styles.error}>{mainError}</span> }
    </div>
  )
}
