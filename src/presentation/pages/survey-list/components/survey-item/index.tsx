import React from 'react'
import styles from './styles.scss'
import { Icon, IconName } from '@/presentation/components'

export function SurveyItem (): JSX.Element {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={IconName.thumbDown} className={styles.iconWrap} />
        <time>
          <span className={styles.day}>03</span>
          <span className={styles.month}>02</span>
          <span className={styles.year}>2023</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}
