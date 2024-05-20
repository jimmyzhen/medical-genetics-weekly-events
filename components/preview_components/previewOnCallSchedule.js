import React, { useState } from 'react';
import dayjs from 'dayjs';

function PreviewOnCallSchedule({
    serviceTitle,
    onCallService,
    serviceDate,
    attending,
    resident,
    provider,
}) {
    return (
        <>
            <div className="em_section_table_oncall_service">
                <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />{serviceTitle}
            </div>
            <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                <tbody><tr>
                    {serviceDate && (
                        <td align="left" valign="top" className="em_section_table_oncall_date">
                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon"/>{serviceDate}
                        </td>
                    )}
                    <td align="left" valign="top" className="em_section_table_oncall_detail" colSpan={!serviceDate ? 2 : ''}>
                        <p>
                            {attending ? `Dr. ${attending}` : ''}
                            {attending && resident ? `, Dr. ${resident}` : ''}
                        {!attending && resident ? `Dr. ${resident}` : ''}
                        {provider ? `Nurse Practitioner - ${provider}` : ''}
                    </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default PreviewOnCallSchedule;
