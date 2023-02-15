import styles from './styles.scss'
import React, { memo } from 'react'

function FooterComponent (): JSX.Element {
  return (
    <footer className={styles.footer} />
  )
}

export const Footer = memo(FooterComponent)
