import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import OnCallServiceStaff from '../data/OnCallServiceStaff';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './FeedbackForm.module.css';

function OnCallServiceRow({ onCallService, index, initialData }) {
    function parseInitialDateRange() {
        const raw = initialData?.[`${onCallService}_date_${index}`];
        if (!raw) return [null, null];
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
    const [attendingPhysician, setAttendingPhysician] = useState(
        findStaffMatch(OnCallServiceStaff.attendingPhysicians, initialData?.[`${onCallService}_attending_${index}`])
    );
    const [resident, setResident] = useState(
        findStaffMatch(OnCallServiceStaff.residents, initialData?.[`${onCallService}_resident_${index}`])
    );

    return (
        <tr>
            <td className={styles['col-date-time__date-select']}>
                <DatePicker
                    name={`${onCallService}_date_${index}`}
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
                    id={`${onCallService}_attending_${index}`}
                    labelKey={(option) => `${option.firstname} ${option.lastname}`}
                    onChange={(selected) => setAttendingPhysician(selected)}
                    options={OnCallServiceStaff.attendingPhysicians}
                    placeholder="Choose attending physician..."
                    selected={attendingPhysician}
                    minLength={2}
                    inputProps={{name: `${onCallService}_attending_${index}`}}
                />
            </td>
            <td>
                <Typeahead
                    id={`${onCallService}_resident_${index}`}
                    labelKey={(option) => `${option.firstname} ${option.lastname}`}
                    onChange={(selected) => setResident(selected)}
                    options={OnCallServiceStaff.residents}
                    placeholder="Choose resident..."
                    selected={resident}
                    minLength={2}
                    inputProps={{name: `${onCallService}_resident_${index}`}}
                />
            </td>
        </tr>
    );
}

function OnCallService({ title, onCallService, rows = 1, initialData }) {
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
                    {Array.from({ length: rows }, (_, i) => (
                        <OnCallServiceRow
                            key={i}
                            onCallService={onCallService}
                            index={i}
                            initialData={initialData}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OnCallService;
