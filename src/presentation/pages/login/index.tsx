import { Footer } from '@/presentation/components/footer'
import { FormStatus } from '@/presentation/components/form-status'
import { Input } from '@/presentation/components/input'
import { LoginHeader } from '@/presentation/components/login-header'
import React from 'react'
import styles from './styles.scss'

export function Login (): JSX.Element {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit" className={styles.submit}>Entrar</button>
        <span className={styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
