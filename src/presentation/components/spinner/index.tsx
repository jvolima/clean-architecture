import styles from './styles.scss'
import React from 'react'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

export function Spinner ({ isNegative, ...props }: Props): JSX.Element {
  const negativeClass = isNegative ? styles.negative : ''

  return (
    <div {...props} data-testid="spinner" className={[styles.spinner, negativeClass, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
