import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import Event from './Event';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './FeedbackForm.module.css';

function Weekday({ dailySchedule, weekStartDate }) {
    const [eventDate, setEventDate] = useState(new Date());
    const { day, events } = dailySchedule;

    function renderWeekday() {
        if (day === 'Tuesday') {
            return weekStartDate ? dayjs(weekStartDate).add(1, 'day').toDate() : eventDate;
        }
        if (day === 'Wednesday') {
            return weekStartDate ? dayjs(weekStartDate).add(2, 'day').toDate() : eventDate;
        }
        if (day === 'Thursday') {
            return weekStartDate ? dayjs(weekStartDate).add(3, 'day').toDate() : eventDate;
        }
        if (day === 'Friday') {
            return weekStartDate ? dayjs(weekStartDate).add(4, 'day').toDate() : eventDate;
        }

        return weekStartDate ? dayjs(weekStartDate).toDate() : eventDate;
    }

    const dayPrefix = day.toLowerCase();
    
    return (
        <div className={styles.weekdaycontainer}>
            <h3>{day}</h3>
            
            <label htmlFor={`${dayPrefix}-date`}>Date<span className={styles.requiredfield}>*</span></label>
            <DatePicker
                id={`${dayPrefix}_date`}
                name={`${dayPrefix}_date`}
                selected={renderWeekday()}
                onChange={(date) => setEventDate(date)}
                className={styles['form-field']}
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy"
                required={true}
                readOnly={true}
            />

            <label htmlFor={`${dayPrefix}_event_announcement`}>Event Announcement</label>
            <input
                className={styles['form-field']}
                type="text"
                id={`${dayPrefix}_event_announcement`}
                name={`${dayPrefix}_event_announcement`}
                placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023"
            />

            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles['col-date-time']}>Time</th>
                    <th>Event Title</th>
                    <th>Zoom Link</th>
                </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => {
                        return (
                            <Event
                                key={`${dayPrefix}-event-${index}`}
                                eventDate={eventDate}
                                dayPrefix={dayPrefix}
                                event={event}
                                index={index}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Weekday;
