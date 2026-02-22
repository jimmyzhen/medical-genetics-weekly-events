import React from 'react';
import mergeArrays from '../../utils/mergeArrays';

function PreviewOutOfOffice({ dates, names }) {

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
