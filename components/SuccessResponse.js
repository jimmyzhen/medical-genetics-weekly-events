import Link from 'next/link'
import styles from './SuccessResponse.module.css'

export default function SuccessResponse() {
    function preview() {
        window.open("/preview", "_blank");
    }
    return (
        <div className={styles['success-content']}>
            <h1>Form successfully submitted!</h1>
            <p>Thank you for your weekly updates!</p>
            <p><button type="button" className={styles['button-preview']} onClick={(e) => preview(e)}>Preview</button><button type="button" className={styles['button-send-email']}>Send Email</button></p>
            <p>Head back to the <Link href="/"><a>home page</a></Link>.</p>
        </div>
    )
}