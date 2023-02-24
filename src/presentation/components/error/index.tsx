import styles from './styles.scss'
import React from 'react'

type Props = {
  error: string
  reload: () => void
}

export function Error ({ error, reload }: Props): JSX.Element {
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </div>
  )
}
