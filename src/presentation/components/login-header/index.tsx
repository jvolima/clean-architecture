import { Logo } from '../logo'
import styles from './styles.scss'
import React, { memo } from 'react'

function LoginHeaderComponent (): JSX.Element {
  return (
    <header className={styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export const LoginHeader = memo(LoginHeaderComponent)
