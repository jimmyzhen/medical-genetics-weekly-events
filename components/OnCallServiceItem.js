import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './FeedbackForm.module.css';

function OnCallServiceItem({
    names,
    onCallService,
    role,
    placeholder,
    multiSelect,
    hasDateRange
}) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [singleStartDate, setSingleStartDate] = useState(null);
    const onCallNamesRef = useRef(null);
    const [onCallNames, setOnCallNames] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    
    return (
        <tr>
            {hasDateRange && (
                <td className={styles['col-date-range-select']}>
                    <input
                        type="checkbox"
                        name={`${onCallService}_date_range_select`}
                        onChange={() => setIsChecked((prev) => !prev)}
                        checked={isChecked}
                    />
                </td>
            )}
            <td className={styles['col-date-time']}>
                {!hasDateRange && (
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onCallService={onCallService}
                        setDateRange={setDateRange}
                    />
                )}
                {hasDateRange && isChecked && (
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onCallService={onCallService}
                        setDateRange={setDateRange}
                    />
                )}
                {hasDateRange && !isChecked && (
                    <SingleDatePicker
                        singleStartDate={singleStartDate}
                        onCallService={onCallService}
                        setSingleStartDate={setSingleStartDate}
                    />
                )}
            </td>
            <td>
                <Typeahead
                    id={`${onCallService}_${role}`}
                    labelKey={(option) => `${option.firstname} ${option.lastname}`}
                    onChange={(selected) => setOnCallNames(selected)}
                    options={names}
                    placeholder={placeholder}
                    selected={onCallNames}
                    minLength={2}
                    multiple={multiSelect}
                    ref={onCallNamesRef}
                />
            </td>
        </tr>
    );
}

export default OnCallServiceItem;

function SingleDatePicker({ singleStartDate, setSingleStartDate, onCallService }) {
    return (
        <DatePicker
            id={`${onCallService}_date`}
            name={`${onCallService}_date`}
            selected={singleStartDate}
            onChange={(date) => setSingleStartDate(date)}
            className={styles['form-field']}
            placeholderText="Select a date"
            dateFormat="MMM d"
        />
    );
}

function DateRangePicker({ startDate, endDate, setDateRange, onCallService }) {
    return (
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
    );
}