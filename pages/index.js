import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import FeedbackForm from "@components/FeedbackForm";
import JokeBlock from "@components/JokeBlock";
import styles from '../components/FeedbackForm.module.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Medical Genetics Weekly Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Medical Genetics Weekly Events" />
        <hr />
        <p className="description">
          Fill out this form for Medical Genetics weekly events newsletter. (Required field<span className={styles.requiredfield}>*</span>)
        </p>
        <FeedbackForm />
        {/*
        <JokeBlock />
        */}
      </main>
      <Footer />
    </div>
  );
}
