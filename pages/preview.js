import React, { useState, useEffect } from 'react';
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

  return (
    <div className="container">
      <Head>
        <title>Medical Genetics Weekly Events - Preview</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css" integrity="sha512-SgaqKKxJDQ/tAUAAXzvxZz33rmn7leYDYfBP+YoMRSENhf3zJyx3SBASt/OfeQwBHA1nxMis7mM3EV/oYT6Fdw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/solid.min.css" integrity="sha512-yDUXOUWwbHH4ggxueDnC5vJv4tmfySpVdIcN1LksGZi8W8EVZv4uKGrQc0pVf66zS7LDhFJM7Zdeow1sw1/8Jw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>

      <main>
        <PreviewEmail eventWeek={eventWeek} />
      </main>

      <Footer />
    </div>
  )
}
