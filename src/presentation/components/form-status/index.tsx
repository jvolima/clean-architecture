import { FormContext } from '@/presentation/contexts'
import { Spinner } from '../spinner'
import styles from './styles.scss'
import React, { useContext } from 'react'

export function FormStatus (): JSX.Element {
  const { state: { isLoading, mainError } } = useContext(FormContext)

  return (
    <div data-testid="form-status" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { mainError && <span data-testid="main-error" className={styles.error}>{mainError}</span> }
    </div>
  )
}
