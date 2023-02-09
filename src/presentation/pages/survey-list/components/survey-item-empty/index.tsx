import React from 'react'
import styles from './styles.scss'

export function SurveyItemEmpty (): JSX.Element {
  return (
    <>
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
    </>
  )
}
