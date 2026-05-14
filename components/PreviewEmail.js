import PreviewEventWeekday from './preview_components/previewEventWeekday';
import PreviewOnCallSchedule from './preview_components/previewOnCallSchedule';
import PreviewOutOfOffice from './preview_components/previewOutOfOffice';
import OnCallServiceEntries from '../data/OnCallServiceEntries';
import mergeArrays from '../utils/mergeArrays';
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

    // Collect form entries by key pattern into an array
    function collectFormEntries(prefix, count, { suffix = '', parseJson = false } = {}) {
        const entries = [];
        for (let i = 0; i < count; i++) {
            entries.push(eventInfo[`${prefix}${i}${suffix}`]);
        }
        if (parseJson) {
            return entries.map((entry) => JSON.parse(entry));
        }
        return entries;
    }

    const nutritionistCount = OnCallServiceEntries.nutritionist.length;
    const outOfOfficeCount = OnCallServiceEntries.out_of_office.length;

    function setNutritionistDates() {
        return collectFormEntries('nutritionist_date_', nutritionistCount);
    }

    function setNutritionists() {
        return collectFormEntries('nutritionist_nutritionist_', nutritionistCount, { suffix: '_value', parseJson: true });
    }

    function setOutOfOfficeDates() {
        return collectFormEntries('out_of_office_date_', outOfOfficeCount);
    }

    function setOutOfOfficeNames() {
        return collectFormEntries('out_of_office_anyone_', outOfOfficeCount, { suffix: '_value', parseJson: true });
    }

    // Normalize multi-entry services into { date, name } arrays for PreviewOnCallSchedule
    function getNutritionistEntries() {
        const dates = setNutritionistDates();
        const names = setNutritionists().map((nutritionistArr) =>
            nutritionistArr.map((n) => `${n.firstname} ${n.lastname}`).join(', ')
        );
        return mergeArrays(dates, names, 'date', 'name');
    }

    function getOnCallServiceEntries(onCallServiceKey, rowCount) {
        const entries = [];
        for (let i = 0; i < rowCount; i++) {
            const date = eventInfo[`${onCallServiceKey}_date_${i}`];
            const attending = eventInfo[`${onCallServiceKey}_attending_${i}`];
            const resident = eventInfo[`${onCallServiceKey}_resident_${i}`];
            if (date) {
                const name = [attending ? `Dr. ${attending}` : '', resident ? `Dr. ${resident}` : ''].filter(Boolean).join(', ');
                entries.push({ date, name });
            }
        }
        return entries;
    }

    function getERTEntries() {
        const count = OnCallServiceEntries.ert.length;
        const dates = collectFormEntries('ert_date_', count);
        const providers = collectFormEntries('ert_provider_', count);
        return mergeArrays(dates, providers, 'date', 'name').map(
            ({ date, name }) => ({ date, name: `Nurse Practitioner - ${name}` })
        );
    }

    function getGeneticCounselorEntries() {
        const gcEntries = OnCallServiceEntries.geneticCounselor;
        const dates = collectFormEntries('genetic_counselor_date_', gcEntries.length);
        const names = collectFormEntries('genetic_counselor_genetic_counselor_', gcEntries.length);
        const prefixedNames = names.map((name, i) =>
            gcEntries[i]?.isTriage ? `Triage GC - ${name}` : `GC - ${name}`
        );
        return mergeArrays(dates, prefixedNames, 'date', 'name');
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
                                Weekly Schedule | Division of Medical Genetics
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" bgcolor="#4d4f53" height={2} style={{height: 2, fontSize: 0, lineHeight: 0, backgroundColor: '#4d4f53'}}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" bgcolor="#ffffff" style={{padding: '30px 50px'}}>
                            <table align="center" border={0} cellSpacing={0} cellPadding={0}>
                                <tbody><tr>
                                    <td align="center" valign="top" bgcolor="#ffffff">
                                    <img src="https://mg-events.netlify.app/som-division-medical-genetics-logo.png" alt="The Division of Medical Genetics" border={0} height={49} width={420} style={{maxWidth: 420}} />
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
                                        🧬
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
                                                                            eventInfo={eventInfo}
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
                                        🧬
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
                                                            entries={getOnCallServiceEntries('medical_genetics_service', 2)}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Perinatal Genetics"
                                                            entries={getOnCallServiceEntries('perinatal_genetics', 2)}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Biochemical Genetics"
                                                            entries={getOnCallServiceEntries('biochemical_genetics', 2)}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="ERT"
                                                            entries={getERTEntries()}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Nutritionist"
                                                            entries={getNutritionistEntries()}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" valign="top" className="em_section_table_oncall">
                                                        <PreviewOnCallSchedule
                                                            serviceTitle="Genetic Counselor"
                                                            entries={getGeneticCounselorEntries()}
                                                        />
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>
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
                                        🧬
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
                                                <PreviewOutOfOffice
                                                    dates={setOutOfOfficeDates()}
                                                    names={setOutOfOfficeNames()}
                                                />
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