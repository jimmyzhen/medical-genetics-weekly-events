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
    // format resident array of objects with first and last names into a string
    function formatResident() {
        let residentArray = '';
        if (resident) {
            // convert "[{\"firstname\":\"John\",\"lastname\":\"Doe\"}]" to [{firstname: "John", lastname: "Doe"}]
            resident = JSON.parse(resident);
            residentArray = resident.map((resident) => {
                return `Dr. ${resident.firstname} ${resident.lastname}`;
            });
        }
        return residentArray.join(', ');
    }

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

    let onCallGeneticCounselors = [];
    if (onCallService === 'genetic_counselor') {
        onCallGeneticCounselors = mergeArrays(serviceDate, provider, 'date', 'name');
    }

    let onCallNutritionists = [];
    if (onCallService === 'nutritionist') {
        provider = provider.map((provider) => {
            return provider.map((nutritionist) => {
                return `${nutritionist.firstname} ${nutritionist.lastname}`;
            }).join(', ');
        });

        onCallNutritionists = mergeArrays(serviceDate, provider, 'date', 'name');
    }

    return (
        <>
            <div className="em_section_table_oncall_service">
                <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />{serviceTitle}
            </div>
            <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                    {(onCallService !== 'genetic_counselor' && onCallService !== 'nutritionist') && (
                        <tr>
                            {serviceDate && (
                                <td align="left" valign="top" className="em_section_table_oncall_date">
                                    <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon"/>{serviceDate}
                                </td>
                            )}
                            <td align="left" valign="top" className="em_section_table_oncall_detail" colSpan={!serviceDate ? 2 : ''}>
                                <p>
                                    {attending ? `Dr. ${attending}` : ''}
                                    {attending && resident ? `, Dr. ${resident}` : ''}
                                    {provider && onCallService === 'ert' ? `Nurse Practitioner - ${provider}` : ''}
                                    {!serviceDate && !attending && resident ? formatResident() : ''}
                                </p>
                            </td>
                        </tr>
                    )}
                    {onCallService === 'genetic_counselor' && onCallGeneticCounselors.map((onCallGeneticCounselor, index) => {
                        return (
                            <tr key={index}>
                                <td align="left" valign="top" className="em_section_table_oncall_date">
                                    <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon"/>{onCallGeneticCounselor.date}
                                </td>
                                <td align="left" valign="top" className="em_section_table_oncall_detail" colSpan={!serviceDate ? 2 : ''}>
                                    <p>{`GC - ${onCallGeneticCounselor.name}`}</p>
                                </td>
                            </tr>
                        );
                    })}
                    {onCallService === 'nutritionist' && onCallNutritionists.map((onCallNutritionist, index) => {
                        return (
                            <tr key={index}>
                                <td align="left" valign="top" className="em_section_table_oncall_date">
                                    <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon"/>{onCallNutritionist.date}
                                </td>
                                <td align="left" valign="top" className="em_section_table_oncall_detail" colSpan={!serviceDate ? 2 : ''}>
                                    <p>{onCallNutritionist.name}</p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default PreviewOnCallSchedule;
