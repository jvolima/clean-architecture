import { Footer } from '@/presentation/components/footer'
import { Input } from '@/presentation/components/input'
import { LoginHeader } from '@/presentation/components/login-header'
import { Spinner } from '@/presentation/components/spinner'
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

        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
