import React, { useState, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './FeedbackForm.module.css';

function OnCallServiceNoDate({
    title,
    onCallService,
    role,
    roleLabel,
    names,
    multiSelect,
    placeholder,
}) {
    const onCallNamesRef = useRef(null);
    const [onCallNames, setOnCallNames] = useState([]);

    return (
        <div className={styles.weekdaycontainer}>
            <h3>{title}</h3>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{roleLabel}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
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
                                inputProps={{name: `${onCallService}_${role}`}}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OnCallServiceNoDate;
