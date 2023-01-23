import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'

type Props = {
  text: string
}

export function SubmitButton ({ text }: Props): JSX.Element {
  const { state } = useContext(FormContext)

  return (
    <button data-testid="submit" type="submit" disabled={state.isFormInvalid}>{text}</button>
  )
}
