import React from 'react';
import OnCallServiceItem from './OnCallServiceItem';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './FeedbackForm.module.css';

function OnCallServiceMultiSelect({
    title,
    onCallService,
    role,
    roleLabel,
    names,
    multiSelect,
    placeholder,
    entries,
    hasDateRange,
    initialData,
}) {
    return (
        <div className={styles.weekdaycontainer}>
            <h3>{title}</h3>

            <table className={styles.table}>
                <thead>
                <tr>
                    {hasDateRange && (
                        <th>Date Range</th>
                    )}
                    <th className={styles['col-date-time__date-select']}>Dates</th>
                    <th>{roleLabel}</th>
                </tr>
                </thead>
                <tbody>
                    {!entries && (
                        <OnCallServiceItem
                            names={names}
                            onCallService={onCallService}
                            role={role}
                            placeholder={placeholder}
                            multiSelect={multiSelect}
                            hasDateRange={hasDateRange}
                            index={0}
                            initialData={initialData}
                        />
                    )}
                    {entries && entries.map((entry, index) => {
                        return (
                            <OnCallServiceItem
                                key={`${onCallService}-${entry.id}-${index}`}
                                names={names}
                                onCallService={onCallService}
                                role={role}
                                placeholder={placeholder}
                                multiSelect={multiSelect}
                                hasDateRange={hasDateRange}
                                index={index}
                                initialData={initialData}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default OnCallServiceMultiSelect;
