import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import Weekday from './EventWeekday';
import WeeklyEvents from '../data/WeeklyEvents';
import OnCallServiceStaff from '../data/OnCallServiceStaff';
import OnCallServiceEntries from '../data/OnCallServiceEntries';
import OnCallService from './OnCallService';
import OnCallServiceMultiSelect from './OnCallServiceMultiSelect';
import OnCallServiceNoDate from './OnCallServiceNoDate';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './FeedbackForm.module.css';

const weekday = require('dayjs/plugin/weekday');
dayjs.extend(weekday);

export default function FeedbackForm() {
  // set start date to the following Monday if it's not Monday
  const [weekStartDate, setWeekStartDate] = useState(dayjs().day() === 1 ? dayjs().toDate() : dayjs().weekday(8).toDate());

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

    {/* Events of the week by weekday */}
    {WeeklyEvents.map((dailySchedule, index) => {
      return (
        <Weekday
          key={`weekday-${index}`}
          dailySchedule={dailySchedule}
          weekStartDate={weekStartDate}
        />
      );
    })}

    <h2 className={styles.sectionhead}>On-Call Schedule</h2>

    {/* On-Call Schedule - Medical Genetics Service */}
    <OnCallService
      title="Medical Genetics Service"
      onCallService="medical_genetics_service"
    />

    {/* On-Call Schedule - Perinatal Genetics */}
    <OnCallService
      title="Perinatal Genetics"
      onCallService="perinatal_genetics"
    />

    {/* On-Call Schedule - Biochemical Genetics */}
    <OnCallService
      title="Biochemical Genetics"
      onCallService="biochemical_genetics"
    />

    {/* On-Call Schedule - ERT */}
    <OnCallServiceMultiSelect
      title="ERT"
      onCallService="ert"
      role="provider"
      roleLabel="Provider"
      names={OnCallServiceStaff.ertProvider}
      multiSelect={false}
      placeholder="Choose nurse practitioner..."
    />

    {/* On-Call Schedule - Nutritionist */}
    <OnCallServiceMultiSelect
      title="Nutritionist"
      onCallService="nutritionist"
      role="nutritionist"
      roleLabel="Nutritionist"
      names={OnCallServiceStaff.nutritionists}
      multiSelect={true}
      placeholder="Choose nutritionist..."
      entries={OnCallServiceEntries.nutritionist}
      hasDateRange={true}
    />

    {/* On-Call Schedule - Genetic Counselor */}
    <OnCallServiceMultiSelect
      title="Genetic Counselor"
      onCallService="genetic_counselor"
      role="genetic_counselor"
      roleLabel="Genetic Counselor"
      names={OnCallServiceStaff.geneticCogunselors}
      multiSelect={false}
      placeholder="Choose genetic counselor..."
      entries={OnCallServiceEntries.geneticCounselor}
    />

    {/* On-Call Schedule - Residents in Clinic */}
    <OnCallServiceNoDate
      title="Residents in Clinic"
      onCallService="residents_in_clinic"
      role="residents"
      roleLabel="Residents"
      names={OnCallServiceStaff.residents}
      multiSelect={true}
      placeholder="Choose residents..."
    />

    {/* On-Call Schedule - Perinatal (Resident) */}
    <OnCallServiceMultiSelect
      title="Perinatal (Resident)"
      onCallService="perinatal_resident"
      role="resident"
      roleLabel="Resident"
      names={OnCallServiceStaff.residents}
      multiSelect={false}
      placeholder="Choose resident..."
    />

    {/* On-Call Schedule - Laboratory Rotation */}
    <OnCallServiceMultiSelect
      title="Laboratory Rotation"
      onCallService="laboratory_rotation"
      role="resident"
      roleLabel="Resident"
      names={OnCallServiceStaff.residents}
      multiSelect={false}
      placeholder="Choose resident..."
    />

    {/* On-Call Schedule - Cancer Rotation */}
    <OnCallServiceMultiSelect
      title="Cancer Rotation"
      onCallService="cancer_rotation"
      role="resident"
      roleLabel="Resident"
      names={OnCallServiceStaff.residents}
      multiSelect={false}
      placeholder="Choose resident..."
    />

    <h2 className={styles.sectionhead}>Out-of-Office</h2>

    {/* On-Call Schedule - Out-of-Office Schedule */}
    <OnCallServiceMultiSelect
      title="Out-of-Office Schedule"
      onCallService="out_of_office"
      role="anyone"
      roleLabel="Names"
      names={[...OnCallServiceStaff.ertProvider, ...OnCallServiceStaff.residents, ...OnCallServiceStaff.nutritionists, ...OnCallServiceStaff.geneticCogunselors]}
      multiSelect={true}
      placeholder="Choose one or more names..."
      entries={OnCallServiceEntries.out_of_office}
      hasDateRange={true}
    />

    <div className={styles['submit-button-container']}>
      <button className={styles.button} type="submit">Submit</button>
    </div>
    </form>
  )
}
