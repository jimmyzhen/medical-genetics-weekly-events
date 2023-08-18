import Head from 'next/head'
import Link from 'next/link'

import Footer from '@components/Footer'

export default function Success() {
  return (
    <div className="container">
      <Head>
        <title>Medical Genetics Weekly Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Form successfully submitted!</h1>
        <p>Thank you for your weekly updates! Head back to the <Link href="/"><a>home page</a></Link>.</p>
      </main>

      <Footer />
    </div>
  )
}
