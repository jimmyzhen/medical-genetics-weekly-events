import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import PreviewEmail from '@components/PreviewEmail';
import Header from '@components/Header';
import Footer from '@components/Footer';

function sortEventsByDate(events) {
  events.sort((a, b) => {
    const timestampA = dayjs(a.created_at);
    const timestampB = dayjs(b.created_at);
    return timestampB - timestampA;
  });
  return events;
}

export default function History() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_FORM_API,
      headers: {
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_FORM_API_AUTH,
      }
    };

    axios.request(config)
      .then((response) => {
        const sorted = sortEventsByDate(response.data || []);
        setSubmissions(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.log('error === ', err);
        setError('Failed to load submission history.');
        setLoading(false);
      });
  }, []);

  if (selectedSubmission) {
    return (
      <div className="container">
        <Head>
          <title>Medical Genetics Weekly Events - History</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css" integrity="sha512-SgaqKKxJDQ/tAUAAXzvxZz33rmn7leYDYfBP+YoMRSENhf3zJyx3SBASt/OfeQwBHA1nxMis7mM3EV/oYT6Fdw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/solid.min.css" integrity="sha512-yDUXOUWwbHH4ggxueDnC5vJv4tmfySpVdIcN1LksGZi8W8EVZv4uKGrQc0pVf66zS7LDhFJM7Zdeow1sw1/8Jw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <link rel="stylesheet" href="/preview.css" />
        </Head>

        <main>
          <div style={{ padding: '16px 0' }}>
            <button
              onClick={() => setSelectedSubmission(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1565c0',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'underline',
                padding: 0,
              }}
            >
              &larr; Back to History
            </button>
          </div>
          <PreviewEmail eventWeek={selectedSubmission} />
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Medical Genetics Weekly Events - History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Newsletter History" />
        <hr />
        <p className="description">
          View previously submitted newsletters.
        </p>

        {loading && <p>Loading submissions...</p>}
        {error && <p style={{ color: '#d32f2f' }}>{error}</p>}

        {!loading && !error && submissions.length === 0 && (
          <p>No submissions found.</p>
        )}

        {!loading && !error && submissions.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #8C1515' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Week of</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Submitted</th>
                <th style={{ textAlign: 'right', padding: '8px 12px' }}></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={submission.id || index}
                  style={{
                    borderBottom: '1px solid #ddd',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <td style={{ padding: '12px' }}>
                    {submission.data?.week || 'Unknown'}
                  </td>
                  <td style={{ padding: '12px', color: '#666' }}>
                    {dayjs(submission.created_at).format('MMM D, YYYY h:mm A')}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ color: '#1565c0', fontWeight: 'bold' }}>View &rarr;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: '24px' }}>
          <Link href="/" style={{ color: '#1565c0', fontWeight: 'bold' }}>
            &larr; Back to Form
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
