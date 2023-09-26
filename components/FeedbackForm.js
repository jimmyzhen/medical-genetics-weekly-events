import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './FeedbackForm.module.css'

export default function FeedbackForm() {
  // const [weekStartDate, setWeekStartDate] = useState(new Date('2021-06-21'));
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [eventMondayDate, setEventMondayDate] = useState(new Date());
  const [eventTuesdayDate, setEventTuesdayDate] = useState(new Date());
  const [eventWednesdayDate, setEventWednesdayDate] = useState(new Date());
  const [eventThursdayDate, setEventThursdayDate] = useState(new Date());
  const [eventFridayDate, setEventFridayDate] = useState(new Date());
  const [eventMondaySchedule, setEventMondaySchedule] = useState({
    time_1: eventMondayDate,
    time_2: eventMondayDate,
    time_3: eventMondayDate,
  });
  const [eventTuesdaySchedule, setEventTuesdaySchedule] = useState({ 
    time_1: eventTuesdayDate,
    time_2: eventTuesdayDate,
    time_3: eventTuesdayDate,
  });
  const [eventWednesdaySchedule, setEventWednesdaySchedule] = useState({
    time_1: eventWednesdayDate,
    time_2: eventWednesdayDate,
    time_3: eventWednesdayDate,
  });
  const [eventThursdaySchedule, setEventThursdaySchedule] = useState({
    time_1: eventThursdayDate,
    time_2: eventThursdayDate,
    time_3: eventThursdayDate,
  });
  const [eventFridaySchedule, setEventFridaySchedule] = useState({
    time_1: eventFridayDate,
    time_2: eventFridayDate,
    time_3: eventFridayDate,
  });
  // medical genetics service
  const [mgsDateRange, setMgsDateRange] = useState([null, null]);
  const [mgsStartDate, mgsEndDate] = mgsDateRange;
  // perinatal genetics
  const [pgDateRange, setPgDateRange] = useState([null, null]);
  const [pgStartDate, pgEndDate] = pgDateRange;
  // biochemical genetics
  const [bgDateRange, setBgDateRange] = useState([null, null]);
  const [bgStartDate, bgEndDate] = bgDateRange;
  // ERT
  const [ertDateRange, setErtDateRange] = useState([null, null]);
  const [ertStartDate, ertEndDate] = ertDateRange;
  // genetic counselor 1
  const [gc1DateRange, setGc1DateRange] = useState([null, null]);
  const [gc1StartDate, gc1EndDate] = gc1DateRange;
  // genetic counselor 2
  const [gc2DateRange, setGc2DateRange] = useState([null, null]);
  const [gc2StartDate, gc2EndDate] = gc2DateRange;
  

  // update event dates when week start date changes
  useEffect(() => {
    setEventMondayDate(weekStartDate);
    setEventTuesdayDate(dayjs(weekStartDate).add(1, 'day').toDate());
    setEventWednesdayDate(dayjs(weekStartDate).add(2, 'day').toDate());
    setEventThursdayDate(dayjs(weekStartDate).add(3, 'day').toDate());
    setEventFridayDate(dayjs(weekStartDate).add(4, 'day').toDate());
  }, [weekStartDate]);

  // update event schedule times when event dates change
  useEffect(() => {
    setEventMondaySchedule({
      time_1: eventMondayDate,
      time_2: eventMondayDate,
      time_3: eventMondayDate,
    });
    setEventTuesdaySchedule({ 
      time_1: eventTuesdayDate,
      time_2: eventTuesdayDate,
      time_3: eventTuesdayDate,
    });
    setEventWednesdaySchedule({
      time_1: eventWednesdayDate,
      time_2: eventWednesdayDate,
      time_3: eventWednesdayDate,
    });
    setEventThursdaySchedule({
      time_1: eventThursdayDate,
      time_2: eventThursdayDate,
      time_3: eventThursdayDate,
    });
    setEventFridaySchedule({
      time_1: eventFridayDate,
      time_2: eventFridayDate,
      time_3: eventFridayDate,
    });
  }, [eventMondayDate, eventTuesdayDate, eventWednesdayDate, eventThursdayDate, eventFridayDate]);

  return (
    <form
      className={styles.form}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      name="feedback"
      method="POST"
      action="/success"
    >
    <input type="hidden" name="form-name" value="feedback" />
    <p className={styles.hidden}>
      <label>
      Don’t fill this out if you’re human: <input name="bot-field" />
      </label>
    </p>
  
    <label htmlFor="week">Week of<span className={styles.requiredfield}>*</span></label>
    <DatePicker
      id="week"
      name="week"
      selected={weekStartDate}
      onChange={(date) => setWeekStartDate(date)}
      className={styles['form-field']}
      placeholderText="Select a date"
      dateFormat="MMMM d, yyyy"
      required={true}
    />

    <label htmlFor="email">Announcement</label>
    <input id="announcement" className={styles['form-field']} type="text" name="announcement" placeholder="Example: Happy birthday to Devon!" />

    <h2 className={styles.sectionhead}>Events</h2>

    {/* Event - Monday */}
    <div className={styles.weekdaycontainer}>
      <h3>Monday</h3>
      
      <label htmlFor="monday-date">Date<span className={styles.requiredfield}>*</span></label>
      <DatePicker
        id="monday-date"
        name="monday-date"
        selected={weekStartDate ? dayjs(weekStartDate).toDate() : eventMondayDate}
        onChange={(date) => setEventMondayDate(date)}
        className={styles['form-field']}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
        required={true}
      />

      <label htmlFor="monday-event-announcement">Event Announcement</label>
      <input id="monday-event-announcement" className={styles['form-field']} type="text" name="monday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Time</th>
            <th>Event</th>
            <th>Zoom Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="monday-time-1"
                selected={eventMondaySchedule.time_1}
                onChange={(date) => setEventMondaySchedule({ ...eventMondaySchedule, time_1: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="monday-event-1" placeholder="Example: Breakfast" /></td>
            <td><input className={styles['form-field']} type="text" name="monday-zoom-link-1" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="monday-time-2"
                selected={eventMondaySchedule.time_2}
                onChange={(date) => setEventMondaySchedule({ ...eventMondaySchedule, time_2: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="monday-event-2" placeholder="Example: Morning Meeting" /></td>
            <td><input className={styles['form-field']} type="text" name="monday-zoom-link-2" /></td> 
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="monday-time-3"
                selected={eventMondaySchedule.time_3}
                onChange={(date) => setEventMondaySchedule({ ...eventMondaySchedule, time_3: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="monday-event-3" placeholder="Example: Lunch" /></td>
            <td><input className={styles['form-field']} type="text" name="monday-zoom-link-3" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Event - Tuesday */}
    <div className={styles.weekdaycontainer}>
      <h3>Tuesday</h3>
      
      <label htmlFor="tuesday-date">Date<span className={styles.requiredfield}>*</span></label>
      <DatePicker
        id="tuesday-date"
        name="tuesday-date"
        selected={weekStartDate ? dayjs(weekStartDate).add(1, 'day').toDate() : eventTuesdayDate}
        onChange={(date) => setEventTuesdayDate(date)}
        className={styles['form-field']}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
        required={true}
      />

      <label htmlFor="tuesday-event-announcement">Event Announcement</label>
      <input id="tuesday-event-announcement" className={styles['form-field']} type="text" name="tuesday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Time</th>
            <th>Event</th>
            <th>Zoom Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="tuesday-time-1"
                selected={eventTuesdaySchedule.time_1}
                onChange={(date) => setEventTuesdaySchedule({ ...eventTuesdaySchedule, time_1: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="tuesday-event-1" placeholder="Example: Breakfast" /></td>
            <td><input className={styles['form-field']} type="text" name="tuesday-zoom-link-1" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="tuesday-time-2"
                selected={eventTuesdaySchedule.time_2}
                onChange={(date) => setEventTuesdaySchedule({ ...eventTuesdaySchedule, time_2: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="tuesday-event-2" placeholder="Example: Morning Meeting" /></td>
            <td><input className={styles['form-field']} type="text" name="tuesday-zoom-link-2" /></td> 
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="tuesday-time-3"
                selected={eventTuesdaySchedule.time_3}
                onChange={(date) => setEventTuesdaySchedule({ ...eventTuesdaySchedule, time_3: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="tuesday-event-3" placeholder="Example: Lunch" /></td>
            <td><input className={styles['form-field']} type="text" name="tuesday-zoom-link-3" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Event - Wednesday */}
    <div className={styles.weekdaycontainer}>
      <h3>Wednesday</h3>
      
      <label htmlFor="wednesday-date">Date<span className={styles.requiredfield}>*</span></label>
      <DatePicker
        id="wednesday-date"
        name="wednesday-date"
        selected={weekStartDate ? dayjs(weekStartDate).add(2, 'day').toDate() : eventWednesdayDate}
        onChange={(date) => setEventWednesdayDate(date)}
        className={styles['form-field']}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
        required={true}
      />

      <label htmlFor="wednesday-event-announcement">Event Announcement</label>
      <input id="wednesday-event-announcement" className={styles['form-field']} type="text" name="wednesday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Time</th>
            <th>Event</th>
            <th>Zoom Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="wednesday-time-1"
                selected={eventWednesdaySchedule.time_1}
                onChange={(date) => setEventWednesdaySchedule({ ...eventWednesdaySchedule, time_1: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="wednesday-event-1" placeholder="Example: Breakfast" /></td>
            <td><input className={styles['form-field']} type="text" name="wednesday-zoom-link-1" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="wednesday-time-2"
                selected={eventWednesdaySchedule.time_2}
                onChange={(date) => setEventWednesdaySchedule({ ...eventWednesdaySchedule, time_2: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="wednesday-event-2" placeholder="Example: Morning Meeting" /></td>
            <td><input className={styles['form-field']} type="text" name="wednesday-zoom-link-2" /></td> 
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="wednesday-time-3"
                selected={eventWednesdaySchedule.time_3}
                onChange={(date) => setEventWednesdaySchedule({ ...eventWednesdaySchedule, time_3: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="wednesday-event-3" placeholder="Example: Lunch" /></td>
            <td><input className={styles['form-field']} type="text" name="wednesday-zoom-link-3" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Event - Thursday */}
    <div className={styles.weekdaycontainer}>
      <h3>Thursday</h3>
      
      <label htmlFor="thursday-date">Date<span className={styles.requiredfield}>*</span></label>
      <DatePicker
        id="thursday-date"
        name="thursday-date"
        selected={weekStartDate ? dayjs(weekStartDate).add(3, 'day').toDate() : eventThursdayDate}
        onChange={(date) => setEventThursdayDate(date)}
        className={styles['form-field']}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
        required={true}
      />

      <label htmlFor="thursday-event-announcement">Event Announcement</label>
      <input id="thursday-event-announcement" className={styles['form-field']} type="text" name="thursday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Time</th>
            <th>Event</th>
            <th>Zoom Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="thursday-time-1"
                selected={eventThursdaySchedule.time_1}
                onChange={(date) => setEventThursdaySchedule({ ...eventThursdaySchedule, time_1: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="thursday-event-1" placeholder="Example: Breakfast" /></td>
            <td><input className={styles['form-field']} type="text" name="thursday-zoom-link-1" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="thursday-time-2"
                selected={eventThursdaySchedule.time_2}
                onChange={(date) => setEventThursdaySchedule({ ...eventThursdaySchedule, time_2: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="thursday-event-2" placeholder="Example: Morning Meeting" /></td>
            <td><input className={styles['form-field']} type="text" name="thursday-zoom-link-2" /></td> 
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="thursday-time-3"
                selected={eventThursdaySchedule.time_3}
                onChange={(date) => setEventThursdaySchedule({ ...eventThursdaySchedule, time_3: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="thursday-event-3" placeholder="Example: Lunch" /></td>
            <td><input className={styles['form-field']} type="text" name="thursday-zoom-link-3" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Event - Friday */}
    <div className={styles.weekdaycontainer}>
      <h3>Friday</h3>
      
      <label htmlFor="friday-date">Date<span className={styles.requiredfield}>*</span></label>
      <DatePicker
        id="friday-date"
        name="friday-date"
        selected={weekStartDate ? dayjs(weekStartDate).add(4, 'day').toDate() : eventFridayDate}
        onChange={(date) => setEventFridayDate(date)}
        className={styles['form-field']}
        placeholderText="Select a date"
        dateFormat="MMMM d, yyyy"
        required={true}
      />

      <label htmlFor="friday-event-announcement">Event Announcement</label>
      <input id="friday-event-announcement" className={styles['form-field']} type="text" name="friday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Time</th>
            <th>Event</th>
            <th>Zoom Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="friday-time-1"
                selected={eventFridaySchedule.time_1}
                onChange={(date) => setEventFridaySchedule({ ...eventFridaySchedule, time_1: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="friday-event-1" placeholder="Example: Breakfast" /></td>
            <td><input className={styles['form-field']} type="text" name="friday-zoom-link-1" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="friday-time-2"
                selected={eventFridaySchedule.time_2}
                onChange={(date) => setEventFridaySchedule({ ...eventFridaySchedule, time_2: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
              </td>
            <td><input className={styles['form-field']} type="text" name="friday-event-2" placeholder="Example: Morning Meeting" /></td>
            <td><input className={styles['form-field']} type="text" name="friday-zoom-link-2" /></td> 
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="friday-time-3"
                selected={eventFridaySchedule.time_3}
                onChange={(date) => setEventFridaySchedule({ ...eventFridaySchedule, time_3: date })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Select a time"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="friday-event-3" placeholder="Example: Lunch" /></td>
            <td><input className={styles['form-field']} type="text" name="friday-zoom-link-3" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className={styles.sectionhead}>On-Call Schedule</h2>

    {/* On-Call Schedule - Medical Genetics Service */}
    <div className={styles.weekdaycontainer}>
      <h3>Medical Genetics Service</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="medical-genetics-service-date"
                selectsRange={true}
                startDate={mgsStartDate}
                endDate={mgsEndDate}
                onChange={(update) => setMgsDateRange(update)}
                placeholderText="Select a date range"
                dateFormat="MMM d"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="medical-genetics-service-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Christy Tise, Resident - Dr. Emily Dunn" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Perinatal Genetics */}
    <div className={styles.weekdaycontainer}>
      <h3>Perinatal Genetics</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="perinatal-genetics-date"
                selectsRange={true}
                startDate={pgStartDate}
                endDate={pgEndDate}
                onChange={(update) => setPgDateRange(update)}
                placeholderText="Select a date range"
                dateFormat="MMM d"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="perinatal-genetics-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Biochemical Genetics */}
    <div className={styles.weekdaycontainer}>
      <h3>Biochemical Genetics</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="biochemical-genetics-date"
                selectsRange={true}
                startDate={bgStartDate}
                endDate={bgEndDate}
                onChange={(update) => setBgDateRange(update)}
                placeholderText="Select a date range"
                dateFormat="MMM d"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="biochemical-genetics-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Christy Tise, Resident - Dr. Emily Dunn, Fellow - [name]" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - ERT */}
    <div className={styles.weekdaycontainer}>
      <h3>ERT</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="ert-date"
                selectsRange={true}
                startDate={ertStartDate}
                endDate={ertEndDate}
                onChange={(update) => setErtDateRange(update)}
                placeholderText="Select a date range"
                dateFormat="MMM d"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="ert-staff" placeholder="Separate by comma and space (', '). Ex: Nurse Practitioner - Holly Bernal" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Nutitionist */}
    <div className={styles.weekdaycontainer}>
      <h3>Nutitionist</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-1" placeholder="Ex: June 23" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-1" placeholder="Ex: Lauren/Tope" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-2" placeholder="Ex: June 24" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-2" placeholder="Ex: Jodi" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-3" placeholder="Ex: June 25" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-3" placeholder="Ex: Jodi" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-4" placeholder="Ex: June 26" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-4" placeholder="Ex: Jodi/Lauren" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-5" placeholder="Ex: June 27" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-5" placeholder="Ex: Jodi/Lauren/Tope" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-6" placeholder="Ex: June 28" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-6" placeholder="Ex: Tope" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-7" placeholder="Ex: June 29" /></td>
            <td><input className={styles['form-field']} type="text" name="nutitionist-staff-7" placeholder="Ex: Jodi" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Genetic Counselor */}
    <div className={styles.weekdaycontainer}>
      <h3>Genetic Counselor</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="genetic-counselor-date-1"
                selectsRange={true}
                startDate={gc1StartDate}
                endDate={gc1EndDate}
                onChange={(update) => setGc1DateRange(update)}
                placeholderText="Select a date range"
                dateFormat="MMM d"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-1" placeholder="Separate by comma and space (', '). Ex: GC - Ellyn Farrelly" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}>
              <DatePicker
                name="genetic-counselor-date-2"
                selectsRange={true}
                startDate={gc2StartDate}
                endDate={gc2EndDate}
                onChange={(update) => setGc2DateRange(update)}
                placeholderText="Select a date range"
                dateFormat="MMM d"
                className={styles['form-field']}
              />
            </td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-2" placeholder="Separate by comma and space (', '). Ex: GC - Emma Smith" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Residents in Clinic */}
    <div className={styles.weekdaycontainer}>
      <h3>Residents in Clinic</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-1" placeholder="Separate by comma and space (', '). Ex: Dr. Lekha Chilakamarri, Dr. Emily Dunn, Dr. Reva Frankel, Dr. Laura Keehan, Dr. Daniel Luz, Dr. Juan Ramos" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Perinatal (Resident) */}
    <div className={styles.weekdaycontainer}>
      <h3>Perinatal (Resident)</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="perinatal-resident-date" placeholder="Ex: June 23 - June 29" /></td>
            <td><input className={styles['form-field']} type="text" name="perinatal-resident-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Laboratory Rotation */}
    <div className={styles.weekdaycontainer}>
      <h3>Laboratory Rotation</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="laboratory-rotation-date" placeholder="Ex: June 23 - June 29" /></td>
            <td><input className={styles['form-field']} type="text" name="laboratory-rotation-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* On-Call Schedule - Cancer Rotation */}
    <div className={styles.weekdaycontainer}>
      <h3>Cancer Rotation</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="cancer-rotation-date" placeholder="Ex: June 23 - June 29" /></td>
            <td><input className={styles['form-field']} type="text" name="cancer-rotation-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className={styles.sectionhead}>Out-of-Office</h2>

    {/* On-Call Schedule - Out-of-Office Schedule */}
    <div className={styles.weekdaycontainer}>
      <h3>Out-of-Office Schedule</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['col-date-time']}>Dates</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-1" placeholder="Ex: June 26" /></td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-1" placeholder="Separate by comma and space (', '). Ex: Brooke, Wesley" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-2" placeholder="Ex: June 27" /></td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-2" placeholder="Separate by comma and space (', '). Ex: Brooke" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-3" placeholder="Ex: June 28" /></td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-3" placeholder="Separate by comma and space (', '). Ex: Brooke" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-4" placeholder="Ex: June 29" /></td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-4" placeholder="Separate by comma and space (', '). Ex: Brooke" /></td>
          </tr>
          <tr>
            <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-5" placeholder="Ex: June 30" /></td>
            <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-5" placeholder="Separate by comma and space (', '). Ex: Brooke, Devon" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <button className={styles.button} type="submit">Submit</button>
    </form>
  )
}
