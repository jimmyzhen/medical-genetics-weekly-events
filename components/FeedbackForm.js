import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import Weekday from './EventWeekday';
import WeeklyEvents from '../data/WeeklyEvents';
import OnCallServiceStaff from '../data/OnCallServiceStaff';
import OnCallServiceEntries from '../data/OnCallServiceEntries';
import OnCallService from './OnCallService';
import OnCallServiceMultiSelect from './OnCallServiceMultiSelect';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './FeedbackForm.module.css';

const weekday = require('dayjs/plugin/weekday');
dayjs.extend(weekday);

const DRAFT_KEY = 'mg-weekly-events-draft';

function serializeForm(formEl) {
  const formData = new FormData(formEl);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

export default function FeedbackForm() {
  const [initialData, setInitialData] = useState(null);
  const [draftStatus, setDraftStatus] = useState(null); // 'restored' | 'saved' | null
  const formRef = useRef(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setInitialData(parsed);
        setDraftStatus('restored');
      }
    } catch {
      // ignore corrupt data
    }
  }, []);

  // set start date to the following Monday if it's not Monday
  const defaultWeekStart = dayjs().day() === 1 ? dayjs().toDate() : dayjs().weekday(8).toDate();
  const [weekStartDate, setWeekStartDate] = useState(
    initialData?.week ? new Date(initialData.week) : defaultWeekStart
  );

  // Update weekStartDate when initialData loads
  useEffect(() => {
    if (initialData?.week) {
      setWeekStartDate(new Date(initialData.week));
    }
  }, [initialData]);

  function handleSaveDraft() {
    if (!formRef.current) return;
    const data = serializeForm(formRef.current);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    setDraftStatus('saved');
    setTimeout(() => setDraftStatus(null), 3000);
  }

  function handleClearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    setDraftStatus(null);
    // Reload to reset form state
    window.location.reload();
  }

  // Use a key to force remount of form when initialData changes
  const formKey = initialData ? 'draft-loaded' : 'fresh';

  return (
    <>
      {/* Draft status bar */}
      <div className={styles['draft-bar']}>
        <div className={styles['draft-buttons']}>
          <button type="button" className={styles['draft-button']} onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button type="button" className={styles['draft-button-secondary']} onClick={handleClearDraft}>
            Clear Draft
          </button>
        </div>
        {draftStatus === 'restored' && (
          <span className={styles['draft-indicator']}>Draft restored</span>
        )}
        {draftStatus === 'saved' && (
          <span className={styles['draft-indicator']}>Draft saved</span>
        )}
      </div>

      <form
        key={formKey}
        ref={formRef}
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
        Don't fill this out if you're human: <input name="bot-field" />
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
      <input id="announcement" className={styles['form-field']} type="text" name="announcement" placeholder="Example: Happy birthday to Devon!" defaultValue={initialData?.announcement || ''} />

      <h2 className={styles.sectionhead}>Events</h2>

      {/* Events of the week by weekday */}
      {WeeklyEvents.map((dailySchedule, index) => {
        return (
          <Weekday
            key={`weekday-${index}`}
            dailySchedule={dailySchedule}
            weekStartDate={weekStartDate}
            initialData={initialData}
          />
        );
      })}

      <h2 className={styles.sectionhead}>On-Call Schedule</h2>

      {/* On-Call Schedule - Medical Genetics Service */}
      <OnCallService
        title="Medical Genetics Service"
        onCallService="medical_genetics_service"
        rows={2}
        initialData={initialData}
      />

      {/* On-Call Schedule - Perinatal Genetics */}
      <OnCallService
        title="Perinatal Genetics"
        onCallService="perinatal_genetics"
        rows={2}
        initialData={initialData}
      />

      {/* On-Call Schedule - Biochemical Genetics */}
      <OnCallService
        title="Biochemical Genetics"
        onCallService="biochemical_genetics"
        rows={2}
        initialData={initialData}
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
        entries={OnCallServiceEntries.ert}
        initialData={initialData}
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
        initialData={initialData}
      />

      {/* On-Call Schedule - Genetic Counselor */}
      <OnCallServiceMultiSelect
        title="Genetic Counselor"
        onCallService="genetic_counselor"
        role="genetic_counselor"
        roleLabel="Genetic Counselor"
        names={OnCallServiceStaff.geneticCounselors}
        multiSelect={false}
        placeholder="Choose genetic counselor..."
        entries={OnCallServiceEntries.geneticCounselor}
        initialData={initialData}
      />

      <h2 className={styles.sectionhead}>Out-of-Office</h2>

      {/* On-Call Schedule - Out-of-Office Schedule */}
      <OnCallServiceMultiSelect
        title="Out-of-Office Schedule"
        onCallService="out_of_office"
        role="anyone"
        roleLabel="Names"
        names={[...OnCallServiceStaff.ertProvider, ...OnCallServiceStaff.residents, ...OnCallServiceStaff.nutritionists, ...OnCallServiceStaff.geneticCounselors]}
        multiSelect={true}
        placeholder="Choose one or more names..."
        entries={OnCallServiceEntries.out_of_office}
        hasDateRange={true}
        initialData={initialData}
      />

      <div className={styles['submit-button-container']}>
        <button className={styles.button} type="submit">Submit</button>
      </div>
      </form>
    </>
  )
}
