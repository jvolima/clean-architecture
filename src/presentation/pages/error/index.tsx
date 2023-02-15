import styles from './styles.scss'
import React from 'react'

export function Error (): JSX.Element {
  return (
    <div className={styles.errorContainer}>
      <h1>Oops!</h1>
      <p>Desculpe, um erro não esperado aconteceu.</p>
      <p>
        <i>Página não encontrada</i>
      </p>
    </div>
  )
}
