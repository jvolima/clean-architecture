import React from 'react'
import { Spinner } from '../spinner'
import styles from './styles.scss'

export function FormStatus (): JSX.Element {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>Erro</span>
    </div>
  )
}
