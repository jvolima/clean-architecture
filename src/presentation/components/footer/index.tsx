import React, { memo } from 'react'
import styles from './styles.scss'

function FooterComponent (): JSX.Element {
  return (
    <footer className={styles.footer} />
  )
}

export const Footer = memo(FooterComponent)
