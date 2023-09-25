import Head from 'next/head'
import SuccessResponse from "@components/SuccessResponse";
import Footer from '@components/Footer'

export default function Success() {
  return (
    <div className="container">
      <Head>
        <title>Medical Genetics Weekly Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SuccessResponse />
      </main>

      <Footer />
    </div>
  )
}
