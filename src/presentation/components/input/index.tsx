import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext, useRef } from 'react'
import styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input (props: Props): JSX.Element {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        data-testid={props.name}
        placeholder=" "
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => {
          setState({ ...state, [e.target.name]: e.target.value })
        }}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => { inputRef.current.focus() }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}
