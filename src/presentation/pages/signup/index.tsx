import { AddAccount } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect, useState } from 'react'
import styles from './styles.scss'

type Props = {
  validation?: Validation
  addAccount?: AddAccount
}

export function SignUp ({ validation, addAccount }: Props): JSX.Element {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) {
      return
    }

    setState({
      ...state,
      isLoading: true
    })

    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button data-testid="submit" type="submit" disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={styles.submit}>Entrar</button>
          <span className={styles.link}>Voltar Para Login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
