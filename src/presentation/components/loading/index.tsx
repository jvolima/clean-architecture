import styles from './styles.scss'
import { Spinner } from '../spinner'
import React from 'react'

export function Loading (): JSX.Element {
  return (
    <div data-testid="loading" className={styles.loadingWrap}>
      <div className={styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}
