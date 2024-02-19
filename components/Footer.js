import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <img src="/som-division-medical-genetics-logo.png" alt="Medical Genetics Logo" className={styles.logo} />
      </footer>
    </>
  )
}
