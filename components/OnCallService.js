import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import OnCallServiceStaff from '../data/OnCallServiceStaff';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './FeedbackForm.module.css';

function OnCallService({ title, onCallService }) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const attendingPhysiciansRef = useRef(null);
    const residentsRef = useRef(null);
    const [attendingPhysician, setAttendingPhysician] = useState([]);
    const [resident, setResident] = useState([]);
    
    return (
        <div className={styles.weekdaycontainer}>
            <h3>{title}</h3>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles['col-date-time']}>Dates</th>
                    <th>Attending</th>
                    <th>Resident</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={styles['col-date-time']}>
                    <DatePicker
                        name={`${onCallService}_date`}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update)}
                        placeholderText="Select a date range"
                        dateFormat="MMM d"
                        className={styles['form-field']}
                    />
                    </td>
                    <td>
                        <Typeahead
                            id={`${onCallService}_attending`}
                            labelKey={(option) => `${option.firstname} ${option.lastname}`}
                            onChange={(selected) => setAttendingPhysician(selected)}
                            options={OnCallServiceStaff.attendingPhysicians}
                            placeholder="Choose attending physician..."
                            selected={attendingPhysician}
                            minLength={2}
                            ref={attendingPhysiciansRef}
                            inputProps={{name: `${onCallService}_attending`}}
                        />
                    </td>
                    <td>
                        <Typeahead
                            id={`${onCallService}_resident`}
                            labelKey={(option) => `${option.firstname} ${option.lastname}`}
                            onChange={(selected) => setResident(selected)}
                            options={OnCallServiceStaff.residents}
                            placeholder="Choose resident..."
                            selected={resident}
                            minLength={2}
                            ref={residentsRef}
                            inputProps={{name: `${onCallService}_resident`}}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OnCallService;
