import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts/form/form-context'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.scss'

export function SignUp (): JSX.Element {
  return (
    <div className={styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state: {} }}>
        <form className={styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button type="submit" className={styles.submit}>Entrar</button>
          <Link to="/login" className={styles.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
