import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext, useRef } from 'react'
import styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props): JSX.Element {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        data-testid={props.name}
        placeholder=" "
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => {
          setState({ ...state, [e.target.name]: e.target.value })
        }}
      />
      <label onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}
