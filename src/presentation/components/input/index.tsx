import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props): JSX.Element {
  const { errorState } = useContext(FormContext)
  const error = errorState[props.name]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>{getStatus()}</span>
    </div>
  )
}
