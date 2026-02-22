import React from 'react';

const MAX_EVENTS_PER_DAY = 3;

function PreviewEventWeekday({
    weekday,
    weekdayLabel,
    date,
    weekdayAnnouncement,
    eventInfo,
}) {
    // Build events array from eventInfo using naming convention
    const events = [];
    for (let i = 0; i < MAX_EVENTS_PER_DAY; i++) {
        const title = eventInfo[`${weekday}_event_title_${i}`];
        if (title) {
            events.push({
                time: eventInfo[`${weekday}_event_time_${i}`],
                title,
                zoom: eventInfo[`${weekday}_event_zoom_${i}`],
            });
        }
    }

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
                    {events.length === 0 && (
                        <tr>
                            <td align="left" valign="top" className="em_section_table_event_time">
                                No event
                            </td>
                            <td align="left" valign="top" className="em_section_table_event_detail">
                                &nbsp;
                            </td>
                        </tr>
                    )}
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td align="left" valign="top" className="em_section_table_event_time">
                            <i className="fa-solid fa-clock em_section_table_event_time_icon" />{event.time}
                            </td>
                            <td align="left" valign="top" className="em_section_table_event_detail">
                                {event.title}
                                {event.zoom ? (
                                    <a href={event.zoom} className="em_zoom_meeting_link">
                                        Join Zoom Meeting
                                    </a>
                                ) : (
                                    <span className="em_zoom_meeting_link_tba">
                                        (Zoom: TBA)
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default PreviewEventWeekday;
