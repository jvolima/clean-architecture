import styles from './styles.scss'
import React from 'react'

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
