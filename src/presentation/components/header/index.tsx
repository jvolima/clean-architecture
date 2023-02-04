import React, { memo } from 'react'
import styles from './styles.scss'
import { Logo } from '../logo'

function HeaderComponent (): JSX.Element {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>João Vitor</span>
          <a href="">Sair</a>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
