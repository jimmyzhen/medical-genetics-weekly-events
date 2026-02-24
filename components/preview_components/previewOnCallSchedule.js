import React from 'react';

/**
 * Renders a single on-call service section.
 *
 * Accepts pre-normalized `entries` array of { date, name } objects for multi-entry
 * services (nutritionist, genetic counselor, etc.), OR individual `serviceDate` /
 * `attending` / `resident` / `provider` props for standard single-row services.
 *
 * When `entries` is provided, it takes precedence and renders one row per entry.
 */
function PreviewOnCallSchedule({
    serviceTitle,
    serviceDate,
    attending,
    resident,
    provider,
    entries,
}) {
    return (
        <>
            <div className="em_section_table_oncall_service">
                <span className="em_section_table_oncall_icon">🩺</span>{serviceTitle}
            </div>
            <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                    {entries ? (
                        // Multi-entry services: render pre-normalized { date, name } rows
                        entries.map((entry, index) => (
                            <tr key={index}>
                                <td align="left" valign="top" className="em_section_table_oncall_date">
                                    <span className="em_section_table_oncall_date_icon">📅</span>{entry.date}
                                </td>
                                <td align="left" valign="top" className="em_section_table_oncall_detail">
                                    <p>{entry.name}</p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        // Single-row services: standard layout
                        <tr>
                            {serviceDate && (
                                <td align="left" valign="top" className="em_section_table_oncall_date">
                                    <span className="em_section_table_oncall_date_icon">📅</span>{serviceDate}
                                </td>
                            )}
                            <td align="left" valign="top" className="em_section_table_oncall_detail" colSpan={!serviceDate ? 2 : ''}>
                                <p>
                                    {attending ? `Dr. ${attending}` : ''}
                                    {attending && resident ? `, ${resident}` : ''}
                                    {provider || ''}
                                    {!attending && resident ? resident : ''}
                                </p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default PreviewOnCallSchedule;
