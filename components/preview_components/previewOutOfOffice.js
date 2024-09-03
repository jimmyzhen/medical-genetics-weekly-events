import React, { useState } from 'react';
import dayjs from 'dayjs';

function PreviewOutOfOffice({ dates, names }) {
    // merge 2 arrays of equal length into an array of objects
    function mergeArrays(arr1, arr2, key1 = 'key1', key2 = 'key2') {
        if (arr1.length !== arr2.length) {
            throw new Error('Arrays must be of equal length');
        }

        const trimmedArr1 = arr1.filter((value) => value.length);
    
        return trimmedArr1.map((value, index) => ({
            [key1]: value,
            [key2]: arr2[index]
        }));
    }

    let individuals = [];
    names = names.map((item) => {
        return item.map((individual) => {
            return `${individual.firstname} ${individual.lastname}`;
        }).join(', ');
    });

    individuals = mergeArrays(dates, names, 'date', 'name');

    return (
        <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
            <tbody>
                {individuals.map((individual, index) => {
                    return (
                        <tr key={index}>
                            <td align="left" valign="top" className="em_section_table_ooo_by_day">
                                <div className="em_section_table_event_day">
                                    <i className="fa-solid fa-calendar-days em_section_table_event_day_icon" />{individual.date}
                                </div>
                                <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                    <tbody>
                                        <tr>
                                            <td align="left" valign="top" className="em_section_table_event_time">
                                                {individual.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default PreviewOutOfOffice;
