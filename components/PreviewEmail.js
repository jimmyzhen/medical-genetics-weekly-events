import Link from 'next/link';
import dayjs from 'dayjs';
import PreviewEventWeekday from './preview_components/previewEventWeekday';
import PreviewOnCallSchedule from './preview_components/previewOnCallSchedule';
import styles from './PreviewEmail.module.css';

const weekdays = [
    {day: 'monday', label: 'Monday'},
    {day: 'tuesday', label: 'Tuesday'},
    {day: 'wednesday', label: 'Wednesday'},
    {day: 'thursday', label: 'Thursday'},
    {day: 'friday', label: 'Friday'},
];

export default function PreviewEmail({ eventWeek }) {
    const eventInfo = eventWeek.data;

    if (!eventInfo || eventInfo === undefined || Object.keys(eventInfo).length === 0) {
        return (
            <div className={styles['preview-container']}>
                <p>Unable to retrieve event information. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className={styles['preview-container']}>
            {/* == Header Section == */}
            <table bgcolor="#eeeeee" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_full_wrap" style={{tableLayout: 'fixed', backgroundColor: '#eeeeee'}}>
                <tbody><tr>
                    <td align="center" valign="top">
                    <table align="center" width={650} border={0} cellSpacing={0} cellPadding={0} className="em_main_table" style={{width: 650, tableLayout: 'fixed'}}>
                        <tbody><tr>
                            <td align="center" valign="top" style={{fontSize: 13, lineHeight: '16px', fontFamily: '"Source Sans Pro", Arial, sans-serif', padding: '15px 15px 16px', color: '#4d4f53'}}>
                            News from the Division of Medical Genetics. | <a href="*|ARCHIVE|*" target="_blank" style={{textDecoration: 'underline', color: '#8c1515', whiteSpace: 'nowrap'}}>View
                                in browser</a> </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" bgcolor="#4d4f53" height={2} style={{height: 2, fontSize: 0, lineHeight: 0, backgroundColor: '#4d4f53'}}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" bgcolor="#ffffff" style={{padding: '30px 50px'}}>
                            <table align="center" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody><tr>
                                    <td align="center" valign="top" bgcolor="#ffffff">
                                    <img src="https://drive.google.com/uc?id=1lsYkjkFVhXEKqKSwwnpBWvRX6C3KMKcE" alt="The Division of Medical Genetics" border={0} height={49} width={420} style={{maxWidth: 420}} />
                                    </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        </tbody></table>
                    </td>
                </tr>
                </tbody></table>
            {/* == //Header Section == */}
            {/* == Announcement_Section == */}
            <table bgcolor="#eeeeee" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_full_wrap" style={{tableLayout: 'fixed', backgroundColor: '#eeeeee'}}>
                <tbody><tr>
                    <td align="center" valign="top">
                        <table align="center" width={650} bgcolor="#ffffff" border={0} cellSpacing={0} cellPadding={0} className="em_main_table" style={{width: 650, tableLayout: 'fixed', backgroundColor: '#ffffff'}}>
                            <tbody>
                                <tr>
                                    <td align="center" valign="top" style={{padding: '0 40px'}}>
                                        <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="center" valign="top" style={{padding: '0 0 30px 0'}}>
                                                    <span style={{color: '#5F574F', fontSize: 22, fontWeight: 700}}>
                                                        Week of {eventInfo.week}
                                                    </span>
                                                    </td>
                                                </tr>
                                                {eventInfo.announcement && eventInfo.announcement.length > 0 && (
                                                    <tr>
                                                        <td align="center" valign="top" style={{padding: '0 0 20px 0'}}>
                                                            <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0} style={{borderCollapse: 'collapse', borderRadius: 24, overflow: 'hidden'}}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="em_announcement">
                                                                        <span>{eventInfo.announcement}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody></table>
            {/* == //Announcement_Section == */}
            {/* == Events_Section == */}
            <table bgcolor="#eeeeee" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_full_wrap" style={{tableLayout: 'fixed', backgroundColor: '#eeeeee'}}>
                <tbody><tr>
                    <td align="center" valign="top">
                    <table bgcolor="#b83a4b" align="center" width={650} border={0} cellSpacing={0} cellPadding={0} className="em_main_table" style={{width: 650, tableLayout: 'fixed', backgroundColor: '#ffffff'}}>
                        <tbody><tr>
                            <td align="center" valign="top" style={{padding: '0 40px'}}>
                            <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody><tr>
                                    <td align="center" valign="top" className="section-marker">
                                    <div className="section-marker-deco">
                                        <i className="fa-solid fa-dna" style={{color: '#ffffff'}} />
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" style={{backgroundColor: '#ffffff', padding: '20px 0 0 0'}}>
                                    <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_section_table_round_corner">
                                        <tbody><tr>
                                            <td className="em_section_title" align="center" valign="top">
                                                Events
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="em_section_table" align="left" valign="top">
                                                <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                    <tbody>
                                                        {weekdays.map((weekday, index) => {
                                                            return (
                                                                <tr key={`${weekday}-${index}`}>
                                                                    <td align="left" valign="top" className="em_section_table_event_by_day">
                                                                        <PreviewEventWeekday
                                                                            weekday={weekday.day}
                                                                            weekdayLabel={weekday.label}
                                                                            date={eventInfo[`${weekday.day}_date`]}
                                                                            weekdayAnnouncement={eventInfo[`${weekday.day}_event_announcement`]}
                                                                            event_time_0={eventInfo[`${weekday.day}_event_time_0`]}
                                                                            event_title_0={eventInfo[`${weekday.day}_event_title_0`]}
                                                                            event_zoom_0={eventInfo[`${weekday.day}_event_zoom_0`]}
                                                                            event_time_1={eventInfo[`${weekday.day}_event_time_1`]}
                                                                            event_title_1={eventInfo[`${weekday.day}_event_title_1`]}
                                                                            event_zoom_1={eventInfo[`${weekday.day}_event_zoom_1`]}
                                                                            event_time_2={eventInfo[`${weekday.day}_event_time_2`]}
                                                                            event_title_2={eventInfo[`${weekday.day}_event_title_2`]}
                                                                            event_zoom_2={eventInfo[`${weekday.day}_event_zoom_2`]}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        </tbody></table>
                    </td>
                </tr>
                </tbody></table>
            {/* == //Events_Section == */}
            {/* == OnCallSchedule_Section == */}
            <table bgcolor="#eeeeee" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_full_wrap" style={{tableLayout: 'fixed', backgroundColor: '#eeeeee'}}>
                <tbody><tr>
                    <td align="center" valign="top">
                    <table bgcolor="#b83a4b" align="center" width={650} border={0} cellSpacing={0} cellPadding={0} className="em_main_table" style={{width: 650, tableLayout: 'fixed', backgroundColor: '#ffffff'}}>
                        <tbody><tr>
                            <td align="center" valign="top" style={{padding: '0 40px'}}>
                            <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody><tr>
                                    <td align="center" valign="top" className="section-marker">
                                    <div className="section-marker-deco">
                                        <i className="fa-solid fa-dna" style={{color: '#ffffff'}} />
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" style={{backgroundColor: '#ffffff', padding: '20px 0 0 0'}}>
                                    <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_section_table_round_corner">
                                        <tbody><tr>
                                            <td className="em_section_title" align="center" valign="top">
                                                On-Call Schedule
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="em_section_table" align="left" valign="top">
                                            <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                <tbody>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Medical Genetics Service"
                                                            onCallService="medical_genetics_service"
                                                            serviceDate={eventInfo.medical_genetics_service_date}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Perinatal Genetics"
                                                            onCallService="perinatal_genetics"
                                                            serviceDate={eventInfo.perinatal_genetics_date}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Biochemical Genetics"
                                                            onCallService="biochemical_genetics"
                                                            serviceDate={eventInfo.biochemical_genetics_date}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="ERT"
                                                            onCallService="ert"
                                                            serviceDate={eventInfo.ert_date}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                    <div className="em_section_table_oncall_service">
                                                        <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />Nutitionist
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 23
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>Lauren/Tope</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 24 - June 25
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>Jodi</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 26
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>Jodi</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 27
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>Jodi/Lauren</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 28
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>Jodi/Lauren/Tope</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 29
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>Tope</p>
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                    <div className="em_section_table_oncall_service">
                                                        <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />Genetic Counselor
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 19 - June 23
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>GC - Ellyn Farrelly</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            <i className="fa-solid fa-calendar-days em_section_table_oncall_date_icon" />June 26 - June 30
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            <p>GC - Emma Smith</p>
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                    <div className="em_section_table_oncall_service">
                                                        <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />Residents in Clinic
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail" colSpan={2}>
                                                            Dr. Lekha Chilakamarri, Dr. Emily Dunn, Dr. Reva Frankel, Dr. Laura Keehan, Dr. Daniel Luz, Dr. Juan Ramos, Dr. Anuja Sule, Dr. Shawn Tahata, Dr. Kajal Verna
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                    <div className="em_section_table_oncall_service">
                                                        <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />Perinatal (Resident)
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                    <div className="em_section_table_oncall_service">
                                                        <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />Laboratory Rotation
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                    <div className="em_section_table_oncall_service">
                                                        <i className="fa-solid fa-stethoscope em_section_table_oncall_icon" />Cancer Rotation
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_oncall_date">
                                                            </td>
                                                            <td align="left" valign="top" className="em_section_table_oncall_detail">
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                </tbody></table>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        </tbody></table>
                    </td>
                </tr>
                </tbody></table>
            {/* == //OnCallSchedule_Section == */}
            {/* == OutOfOffice_Section == */}
            <table bgcolor="#eeeeee" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_full_wrap" style={{tableLayout: 'fixed', backgroundColor: '#eeeeee'}}>
                <tbody><tr>
                    <td align="center" valign="top">
                    <table bgcolor="#b83a4b" align="center" width={650} border={0} cellSpacing={0} cellPadding={0} className="em_main_table" style={{width: 650, tableLayout: 'fixed', backgroundColor: '#ffffff'}}>
                        <tbody><tr>
                            <td align="center" valign="top" style={{padding: '0 40px'}}>
                            <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody><tr>
                                    <td align="center" valign="top" className="section-marker">
                                    <div className="section-marker-deco">
                                        <i className="fa-solid fa-dna" style={{color: '#ffffff'}} />
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" style={{backgroundColor: '#ffffff', padding: '20px 0 0 0'}}>
                                    <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_section_table_round_corner">
                                        <tbody><tr>
                                            <td className="em_section_title" align="center" valign="top">
                                            Out-of-Office
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="em_section_table" align="left" valign="top">
                                            <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                <tbody><tr>
                                                    <td align="left" valign="top" className="em_section_table_ooo_by_day">
                                                    <div className="em_section_table_event_day">
                                                        <i className="fa-solid fa-calendar-days em_section_table_event_day_icon" />June 26 - June 30
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_event_time">
                                                            Brooke (leave)
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_ooo_by_day">
                                                    <div className="em_section_table_event_day">
                                                        <i className="fa-solid fa-calendar-days em_section_table_event_day_icon" />June 26
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_event_time">
                                                            Wesley
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_ooo_by_day">
                                                    <div className="em_section_table_event_day">
                                                        <i className="fa-solid fa-calendar-days em_section_table_event_day_icon" />June 30
                                                    </div>
                                                    <table align="left" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                        <tbody><tr>
                                                            <td align="left" valign="top" className="em_section_table_event_time">
                                                            Devon
                                                            </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                                </tbody></table>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        </tbody></table>
                    </td>
                </tr>
                </tbody></table>
            {/* == //OutOfOffice_Section == */}
            {/* == Footer Section == */}
            <table bgcolor="#eeeeee" width="100%" border={0} cellSpacing={0} cellPadding={0} className="em_full_wrap" style={{tableLayout: 'fixed', backgroundColor: '#eeeeee'}}>
                <tbody><tr>
                    <td align="center" valign="top">
                    <table bgcolor="#ffffff" align="center" width={650} border={0} cellSpacing={0} cellPadding={0} className="em_main_table" style={{width: 650, tableLayout: 'fixed', backgroundColor: '#ffffff'}}>
                        <tbody><tr>
                            <td align="center" valign="top" style={{paddingTop: 12}}>
                            <table align="center" width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody><tr>
                                    <td align="center" valign="top" bgcolor="#7F7776" style={{padding: '8px 0', backgroundColor: '#7F7776'}}>
                                    &nbsp;
                                    </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        </tbody></table>
                    </td>
                </tr>
                </tbody></table>
            {/* == //Footer Section == */}
        </div>
    )
}