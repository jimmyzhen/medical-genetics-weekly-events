import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import dayjs from 'dayjs';
import PreviewEmail from "@components/PreviewEmail";
import Footer from '@components/Footer';

function sortEventsByDate(events) {
  events.sort((a, b) => {
    const timestampA = dayjs(a.created_at);
    const timestampB = dayjs(b.created_at);
    return timestampB - timestampA;
  });
  return events;
}

export default function Preview() {
  const [eventWeek, setEventWeek] = useState({});
  const [sendStatus, setSendStatus] = useState('idle');
  const [sendError, setSendError] = useState('');
  const previewRef = useRef(null);

  // set up the effect to fetch data
  useEffect(() => {
    // netlify api call
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_FORM_API,
      headers: {
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_FORM_API_AUTH,
      }
    };

    axios.request(config)
    .then((response) => {
      // get the latest submission
      const eventData = response.data;
      if (eventData.length && eventData.length > 1) {
        let sorted = sortEventsByDate(eventData);
        setEventWeek(sorted[0]);
      } else if (eventData.length && eventData.length === 1) {
        setEventWeek(eventData[0]);
      }
    })
    .catch((error) => {
      console.log('error === ', error);
    });
  }, []);

  const handleSendEmail = async () => {
    if (!window.confirm('Are you sure you want to send this newsletter email?')) {
      return;
    }

    const html = previewRef.current?.innerHTML;
    if (!html) {
      setSendError('No email content to send.');
      setSendStatus('error');
      return;
    }

    const week = eventWeek?.data?.week || 'Unknown Week';
    const subject = `Medical Genetics Newsletter - Week of ${week}`;

    setSendStatus('sending');
    setSendError('');

    try {
      const response = await axios.post('/api/send-email', { html, subject });
      if (response.data.success) {
        setSendStatus('success');
      } else {
        setSendError(response.data.error || 'Unknown error');
        setSendStatus('error');
      }
    } catch (err) {
      setSendError(err.response?.data?.error || err.message);
      setSendStatus('error');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Medical Genetics Weekly Events - Preview</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css" integrity="sha512-SgaqKKxJDQ/tAUAAXzvxZz33rmn7leYDYfBP+YoMRSENhf3zJyx3SBASt/OfeQwBHA1nxMis7mM3EV/oYT6Fdw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/solid.min.css" integrity="sha512-yDUXOUWwbHH4ggxueDnC5vJv4tmfySpVdIcN1LksGZi8W8EVZv4uKGrQc0pVf66zS7LDhFJM7Zdeow1sw1/8Jw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="/preview.css" />
      </Head>

      <main>
        <div ref={previewRef}>
          <PreviewEmail eventWeek={eventWeek} />
        </div>

        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <button
            onClick={handleSendEmail}
            disabled={sendStatus === 'sending'}
            style={{
              backgroundColor: sendStatus === 'success' ? '#2e7d32' : '#8C1515',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: sendStatus === 'sending' ? 'not-allowed' : 'pointer',
              opacity: sendStatus === 'sending' ? 0.7 : 1,
            }}
          >
            {sendStatus === 'idle' && 'Send Email'}
            {sendStatus === 'sending' && 'Sending...'}
            {sendStatus === 'success' && 'Email Sent!'}
            {sendStatus === 'error' && 'Retry Send'}
          </button>
          {sendStatus === 'error' && (
            <p style={{ color: '#d32f2f', marginTop: '8px', fontSize: '14px' }}>
              Error: {sendError}
            </p>
          )}
          {sendStatus === 'success' && (
            <p style={{ color: '#2e7d32', marginTop: '8px', fontSize: '14px' }}>
              Newsletter sent successfully!
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
