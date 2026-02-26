import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import OnCallServiceStaff from '../data/OnCallServiceStaff';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './FeedbackForm.module.css';

function OnCallService({ title, onCallService, initialData }) {
    function parseInitialDateRange() {
        const raw = initialData?.[`${onCallService}_date`];
        if (!raw) return [null, null];
        // Netlify stores date range as "MMM d - MMM d" string
        const parts = raw.split(' - ');
        if (parts.length === 2) {
            return [new Date(parts[0] + ', ' + new Date().getFullYear()), new Date(parts[1] + ', ' + new Date().getFullYear())];
        }
        return [null, null];
    }

    function findStaffMatch(staffList, nameStr) {
        if (!nameStr) return [];
        const match = staffList.find(s => `${s.firstname} ${s.lastname}` === nameStr);
        return match ? [match] : [];
    }

    const [dateRange, setDateRange] = useState(initialData ? parseInitialDateRange() : [null, null]);
    const [startDate, endDate] = dateRange;
    const attendingPhysiciansRef = useRef(null);
    const residentsRef = useRef(null);
    const [attendingPhysician, setAttendingPhysician] = useState(
        findStaffMatch(OnCallServiceStaff.attendingPhysicians, initialData?.[`${onCallService}_attending`])
    );
    const [resident, setResident] = useState(
        findStaffMatch(OnCallServiceStaff.residents, initialData?.[`${onCallService}_resident`])
    );
    
    return (
        <div className={styles.weekdaycontainer}>
            <h3>{title}</h3>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles['col-date-time__date-select']}>Dates</th>
                    <th>Attending</th>
                    <th>Resident</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={styles['col-date-time__date-select']}>
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
