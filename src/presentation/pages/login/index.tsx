import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useState } from 'react'
import styles from './styles.scss'

export function Login (): JSX.Element {
  const [state, setState] = useState({
    isLoading: false
  })

  const [errorState, setErrorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled type="submit" className={styles.submit}>Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
