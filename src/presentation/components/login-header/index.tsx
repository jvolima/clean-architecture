import React, { memo } from 'react'
import { Logo } from '../logo'
import styles from './styles.scss'

function LoginHeaderComponent (): JSX.Element {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export const LoginHeader = memo(LoginHeaderComponent)
