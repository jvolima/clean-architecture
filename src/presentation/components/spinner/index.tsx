import React from 'react'
import styles from './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

export function Spinner (props: Props): JSX.Element {
  return (
    <div {...props} data-testid="spinner" className={[styles.spinner, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
