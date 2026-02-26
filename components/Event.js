import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './FeedbackForm.module.css';

function Event({ eventDate, dayPrefix, event, index, initialData}) {
    const draftTime = initialData?.[`${dayPrefix}_event_time_${index}`];
    const [eventSchedule, setEventSchedule] = useState(
        draftTime ? new Date(draftTime) : (event.time ? new Date(event.time) : eventDate)
    );

    const draftTitle = initialData?.[`${dayPrefix}_event_title_${index}`];
    const draftZoom = initialData?.[`${dayPrefix}_event_zoom_${index}`];

    return (
        <tr>
            <td className={styles['col-date-time__time-select']}>
                <DatePicker
                    name={`${dayPrefix}_event_time_${index}`}
                    selected={eventSchedule}
                    onChange={(date) => setEventSchedule(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select a time"
                    className={styles['form-field']}
                />
            </td>
            <td>
                <input
                    className={styles['form-field']}
                    type="text"
                    name={`${dayPrefix}_event_title_${index}`}
                    placeholder="Enter an event title"
                    defaultValue={draftTitle !== undefined ? draftTitle : event.title}
                />
            </td>
            <td>
                <input
                    className={styles['form-field']}
                    type="text"
                    name={`${dayPrefix}_event_zoom_${index}`}
                    defaultValue={draftZoom !== undefined ? draftZoom : event.zoom}
                />
            </td>
        </tr>
    );
}

export default Event;
