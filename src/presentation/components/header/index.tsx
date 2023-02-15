import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './styles.scss'
import { Logo } from '../logo'
import { ApiContext } from '@/presentation/contexts'

function HeaderComponent (): JSX.Element {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>João Vitor</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
