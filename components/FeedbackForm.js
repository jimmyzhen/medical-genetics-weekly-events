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
      role="nurser_practitioner"
      roleLabel="Nurse Practitioner"
      names={OnCallServiceStaff.nursePractitioner}
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
      role="residents_in_clinic"
      roleLabel="Residents"
      names={OnCallServiceStaff.residents}
      multiSelect={true}
      placeholder="Choose residents..."
    />

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
