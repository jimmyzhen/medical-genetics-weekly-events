import styles from './FeedbackForm.module.css'

export default function FeedbackForm() {
  return (
      <form
        className={styles.form}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="feedback"
        method="POST"
        action="/success"
      >
        <input type="hidden" name="form-name" value="feedback" />
        {/*
        <p className={styles.hidden}>
            <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
        </p>
        */}
  
        <label htmlFor="week">Week of<span className={styles.requiredfield}>*</span></label>
        <input id="week" className={styles['form-field']} type="text" name="week" placeholder="Example: June 26, 2023" required />

        <label htmlFor="email">Announcement</label>
        <input id="announcement" className={styles['form-field']} type="text" name="announcement" placeholder="Example: Happy birthday to Devon!" />

        <h2 className={styles.sectionhead}>Events</h2>

        {/* Event - Monday */}
        <div className={styles.weekdaycontainer}>
          <h3>Monday</h3>
          
          <label htmlFor="monday-date">Date<span className={styles.requiredfield}>*</span></label>
          <input id="monday-date" className={styles['form-field']} type="text" name="monday-date" placeholder="Example: June 26" required />

          <label htmlFor="monday-event-announcement">Event Announcement</label>
          <input id="monday-event-announcement" className={styles['form-field']} type="text" name="monday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Time</th>
                      <th>Event</th>
                      <th>Zoom Link</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="monday-time-1" placeholder="Example: 9:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="monday-event-1" placeholder="Example: Breakfast" /></td>
                      <td><input className={styles['form-field']} type="text" name="monday-zoom-link-1" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="monday-time-2" placeholder="Example: 10:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="monday-event-2" placeholder="Example: Morning Meeting" /></td>
                      <td><input className={styles['form-field']} type="text" name="monday-zoom-link-2" /></td> 
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="monday-time-3" placeholder="Example: 12:00 PM" /></td>
                      <td><input className={styles['form-field']} type="text" name="monday-event-3" placeholder="Example: Lunch" /></td>
                      <td><input className={styles['form-field']} type="text" name="monday-zoom-link-3" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* Event - Tuesday */}
        <div className={styles.weekdaycontainer}>
          <h3>Tuesday</h3>
          
          <label htmlFor="tuesday-date">Date<span className={styles.requiredfield}>*</span></label>
          <input id="tuesday-date" className={styles['form-field']} type="text" name="tuesday-date" placeholder="Example: June 27" required />

          <label htmlFor="tuesday-event-announcement">Event Announcement</label>
          <input id="tuesday-event-announcement" className={styles['form-field']} type="text" name="tuesday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Time</th>
                      <th>Event</th>
                      <th>Zoom Link</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="tuesday-time-1" placeholder="Example: 9:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="tuesday-event-1" placeholder="Example: Breakfast" /></td>
                      <td><input className={styles['form-field']} type="text" name="tuesday-zoom-link-1" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="tuesday-time-2" placeholder="Example: 10:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="tuesday-event-2" placeholder="Example: Morning Meeting" /></td>
                      <td><input className={styles['form-field']} type="text" name="tuesday-zoom-link-2" /></td> 
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="tuesday-time-3" placeholder="Example: 12:00 PM" /></td>
                      <td><input className={styles['form-field']} type="text" name="tuesday-event-3" placeholder="Example: Lunch" /></td>
                      <td><input className={styles['form-field']} type="text" name="tuesday-zoom-link-3" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* Event - Wednesday */}
        <div className={styles.weekdaycontainer}>
          <h3>Wednesday</h3>
          
          <label htmlFor="wednesday-date">Date<span className={styles.requiredfield}>*</span></label>
          <input id="wednesday-date" className={styles['form-field']} type="text" name="wednesday-date" placeholder="Example: June 28" required />

          <label htmlFor="wednesday-event-announcement">Event Announcement</label>
          <input id="wednesday-event-announcement" className={styles['form-field']} type="text" name="wednesday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Time</th>
                      <th>Event</th>
                      <th>Zoom Link</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="wednesday-time-1" placeholder="Example: 9:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="wednesday-event-1" placeholder="Example: Breakfast" /></td>
                      <td><input className={styles['form-field']} type="text" name="wednesday-zoom-link-1" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="wednesday-time-2" placeholder="Example: 10:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="wednesday-event-2" placeholder="Example: Morning Meeting" /></td>
                      <td><input className={styles['form-field']} type="text" name="wednesday-zoom-link-2" /></td> 
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="wednesday-time-3" placeholder="Example: 12:00 PM" /></td>
                      <td><input className={styles['form-field']} type="text" name="wednesday-event-3" placeholder="Example: Lunch" /></td>
                      <td><input className={styles['form-field']} type="text" name="wednesday-zoom-link-3" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* Event - Thursday */}
        <div className={styles.weekdaycontainer}>
          <h3>Thursday</h3>
          
          <label htmlFor="thursday-date">Date<span className={styles.requiredfield}>*</span></label>
          <input id="thursday-date" className={styles['form-field']} type="text" name="thursday-date" placeholder="Example: June 29" required />

          <label htmlFor="thursday-event-announcement">Event Announcement</label>
          <input id="thursday-event-announcement" className={styles['form-field']} type="text" name="thursday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Time</th>
                      <th>Event</th>
                      <th>Zoom Link</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="thursday-time-1" placeholder="Example: 9:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="thursday-event-1" placeholder="Example: Breakfast" /></td>
                      <td><input className={styles['form-field']} type="text" name="thursday-zoom-link-1" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="thursday-time-2" placeholder="Example: 10:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="thursday-event-2" placeholder="Example: Morning Meeting" /></td>
                      <td><input className={styles['form-field']} type="text" name="thursday-zoom-link-2" /></td> 
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="thursday-time-3" placeholder="Example: 12:00 PM" /></td>
                      <td><input className={styles['form-field']} type="text" name="thursday-event-3" placeholder="Example: Lunch" /></td>
                      <td><input className={styles['form-field']} type="text" name="thursday-zoom-link-3" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* Event - Friday */}
        <div className={styles.weekdaycontainer}>
          <h3>Friday</h3>
          
          <label htmlFor="friday-date">Date<span className={styles.requiredfield}>*</span></label>
          <input id="friday-date" className={styles['form-field']} type="text" name="friday-date" placeholder="Example: June 30" required />

          <label htmlFor="friday-event-announcement">Event Announcement</label>
          <input id="friday-event-announcement" className={styles['form-field']} type="text" name="friday-event-announcement" placeholder="Example: NO Pediatric Grand Rounds - will resume on Sept 05, 2023" />

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Time</th>
                      <th>Event</th>
                      <th>Zoom Link</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="friday-time-1" placeholder="Example: 9:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="friday-event-1" placeholder="Example: Breakfast" /></td>
                      <td><input className={styles['form-field']} type="text" name="friday-zoom-link-1" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="friday-time-2" placeholder="Example: 10:00 AM" /></td>
                      <td><input className={styles['form-field']} type="text" name="friday-event-2" placeholder="Example: Morning Meeting" /></td>
                      <td><input className={styles['form-field']} type="text" name="friday-zoom-link-2" /></td> 
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="friday-time-3" placeholder="Example: 12:00 PM" /></td>
                      <td><input className={styles['form-field']} type="text" name="friday-event-3" placeholder="Example: Lunch" /></td>
                      <td><input className={styles['form-field']} type="text" name="friday-zoom-link-3" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <h2 className={styles.sectionhead}>On-Call Schedule</h2>

        {/* On-Call Schedule - Medical Genetics Service */}
        <div className={styles.weekdaycontainer}>
          <h3>Medical Genetics Service</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="medical-genetics-service-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="medical-genetics-service-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Christy Tise, Resident - Dr. Emily Dunn" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Perinatal Genetics */}
        <div className={styles.weekdaycontainer}>
          <h3>Perinatal Genetics</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="perinatal-genetics-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="perinatal-genetics-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

         {/* On-Call Schedule - Biochemical Genetics */}
         <div className={styles.weekdaycontainer}>
          <h3>Biochemical Genetics</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="biochemical-genetics-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="biochemical-genetics-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Christy Tise, Resident - Dr. Emily Dunn, Fellow - [name]" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - ERT */}
        <div className={styles.weekdaycontainer}>
          <h3>ERT</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="ert-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="ert-staff" placeholder="Separate by comma and space (', '). Ex: Nurse Practitioner - Holly Bernal" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Nutitionist */}
        <div className={styles.weekdaycontainer}>
          <h3>Nutitionist</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-1" placeholder="Ex: June 23" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-1" placeholder="Ex: Lauren/Tope" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-2" placeholder="Ex: June 24" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-2" placeholder="Ex: Jodi" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-3" placeholder="Ex: June 25" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-3" placeholder="Ex: Jodi" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-4" placeholder="Ex: June 26" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-4" placeholder="Ex: Jodi/Lauren" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-5" placeholder="Ex: June 27" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-5" placeholder="Ex: Jodi/Lauren/Tope" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-6" placeholder="Ex: June 28" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-6" placeholder="Ex: Tope" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="nutitionist-date-7" placeholder="Ex: June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="nutitionist-staff-7" placeholder="Ex: Jodi" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Genetic Counselor */}
        <div className={styles.weekdaycontainer}>
          <h3>Genetic Counselor</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-1" placeholder="Ex: June 19 - June 23" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-1" placeholder="Separate by comma and space (', '). Ex: GC - Ellyn Farrelly" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-2" placeholder="Ex: June 26 - June 30" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-2" placeholder="Separate by comma and space (', '). Ex: GC - Emma Smith" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Residents in Clinic */}
        <div className={styles.weekdaycontainer}>
          <h3>Residents in Clinic</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-1" placeholder="Separate by comma and space (', '). Ex: Dr. Lekha Chilakamarri, Dr. Emily Dunn, Dr. Reva Frankel, Dr. Laura Keehan, Dr. Daniel Luz, Dr. Juan Ramos" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Perinatal (Resident) */}
        <div className={styles.weekdaycontainer}>
          <h3>Perinatal (Resident)</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="perinatal-resident-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="perinatal-resident-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Laboratory Rotation */}
        <div className={styles.weekdaycontainer}>
          <h3>Laboratory Rotation</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="laboratory-rotation-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="laboratory-rotation-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        {/* On-Call Schedule - Cancer Rotation */}
        <div className={styles.weekdaycontainer}>
          <h3>Cancer Rotation</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="cancer-rotation-date" placeholder="Ex: June 23 - June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="cancer-rotation-staff" placeholder="Separate by comma and space (', '). Ex: Attending - Dr. Melanie Manning" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <h2 className={styles.sectionhead}>Out-of-Office</h2>

        {/* On-Call Schedule - Out-of-Office Schedule */}
        <div className={styles.weekdaycontainer}>
          <h3>Out-of-Office Schedule</h3>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th className={styles['col-date-time']}>Dates</th>
                      <th>Staff</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-1" placeholder="Ex: June 26" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-1" placeholder="Separate by comma and space (', '). Ex: Brooke, Wesley" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-2" placeholder="Ex: June 27" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-2" placeholder="Separate by comma and space (', '). Ex: Brooke" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-3" placeholder="Ex: June 28" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-3" placeholder="Separate by comma and space (', '). Ex: Brooke" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-4" placeholder="Ex: June 29" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-4" placeholder="Separate by comma and space (', '). Ex: Brooke" /></td>
                  </tr>
                  <tr>
                      <td className={styles['col-date-time']}><input className={styles['form-field']} type="text" name="genetic-counselor-date-5" placeholder="Ex: June 30" /></td>
                      <td><input className={styles['form-field']} type="text" name="genetic-counselor-staff-5" placeholder="Separate by comma and space (', '). Ex: Brooke, Devon" /></td>
                  </tr>
              </tbody>
          </table>
        </div>

        <button className={styles.button} type="submit">Submit</button>
      </form>
  )
}
