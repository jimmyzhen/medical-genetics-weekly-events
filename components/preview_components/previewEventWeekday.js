import React, { useState } from 'react';
import dayjs from 'dayjs';

function PreviewEventWeekday({
    weekday,
    weekdayLabel,
    date,
    weekdayAnnouncement,
    event_time_0,
    event_title_0,
    event_zoom_0,
    event_time_1,
    event_title_1,
    event_zoom_1,
    event_time_2,
    event_title_2,
    event_zoom_2,
}) {
    return (
        <>
            <div className="em_section_table_event_day">
                <i className="fa-solid fa-calendar-days em_section_table_event_day_icon" />{`${weekdayLabel}, ${date}`}
            </div>
            <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                    {weekdayAnnouncement && (
                        <tr>
                            <td align="left" valign="top" className="em_section_table_event_detail" colSpan={2}>
                            <strong>{weekdayAnnouncement}</strong>
                            </td>
                        </tr>
                    )}
                    {!event_title_0 && !event_title_1 && !event_title_2 && (
                        <tr>
                            <td align="left" valign="top" className="em_section_table_event_time">
                                No event
                            </td>
                            <td align="left" valign="top" className="em_section_table_event_detail">
                                &nbsp;
                            </td>
                        </tr>
                    )}
                    {event_title_0 && (
                        <tr>
                            <td align="left" valign="top" className="em_section_table_event_time">
                            <i className="fa-solid fa-clock em_section_table_event_time_icon" />{event_time_0}
                            </td>
                            <td align="left" valign="top" className="em_section_table_event_detail">
                                {event_title_0}
                                {event_zoom_0 ? (
                                    <a href={event_zoom_0} className="em_zoom_meeting_link">
                                        Join Zoom Meeting
                                    </a>
                                ) : (
                                    <span className="em_zoom_meeting_link_tba">
                                        (Zoom: TBA)
                                    </span>
                                )}
                                
                            </td>
                        </tr>
                    )}
                    {event_title_1 && (
                        <tr>
                            <td align="left" valign="top" className="em_section_table_event_time">
                            <i className="fa-solid fa-clock em_section_table_event_time_icon" />{event_time_1}
                            </td>
                            <td align="left" valign="top" className="em_section_table_event_detail">
                                {event_title_1}
                                {event_zoom_1 ? (
                                    <a href={event_zoom_1} className="em_zoom_meeting_link">
                                        Join Zoom Meeting
                                    </a>
                                ) : (
                                    <span className="em_zoom_meeting_link_tba">
                                        (Zoom: TBA)
                                    </span>
                                )}
                                
                            </td>
                        </tr>
                    )}
                    {event_title_2 && (
                        <tr>
                            <td align="left" valign="top" className="em_section_table_event_time">
                            <i className="fa-solid fa-clock em_section_table_event_time_icon" />{event_time_2}
                            </td>
                            <td align="left" valign="top" className="em_section_table_event_detail">
                                {event_title_2}
                                {event_zoom_2 ? (
                                    <a href={event_zoom_2} className="em_zoom_meeting_link">
                                        Join Zoom Meeting
                                    </a>
                                ) : (
                                    <span className="em_zoom_meeting_link_tba">
                                        &nbsp;&nbsp;(Zoom: TBA)
                                    </span>
                                )}
                                
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default PreviewEventWeekday;
