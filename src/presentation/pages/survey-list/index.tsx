import React from 'react'
import { Footer, Header, Icon, IconName } from '@/presentation/components'
import styles from './styles.scss'

export function SurveyList (): JSX.Element {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
