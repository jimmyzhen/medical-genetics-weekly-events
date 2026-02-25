import sgMail from '@sendgrid/mail';
import juice from 'juice';

const EMAIL_CSS = `
body {
    font-family:'Source Sans Pro', Arial, sans-serif;
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100% !important;
    -ms-text-size-adjust: 100% !important;
    -webkit-font-smoothing: antialiased !important;
}
img {
    border: 0 !important;
    outline: none !important;
}
p {
    margin: 0 !important;
    padding: 0 !important;
}
table {
    border-collapse: collapse;
    font-family: 'Source Sans Pro', Arial, sans-serif;
}
.em_defaultlink a {
    color: inherit !important;
    text-decoration: none !important;
}
.em_g_img+div {
    display: none;
}
a[x-apple-data-detectors],
u+.em_body a,
#MessageViewBody a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
}
.section-marker {
    background-color: #ffffff;
    background-image: url('https://drive.google.com/uc?id=19eWtID-__c4_F-CCnta_b5Hw21kXdVWy');
    background-repeat: repeat-x;
    background-position: center;
    background-size: 1px 1px;
}
.section-marker-deco {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C7D1C6;
    border-radius: 15px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    width: 30px;
    height: 30px;
}
.em_white a { color: #ffffff; text-decoration: underline; }
.em_gray a { color: #007C92; text-decoration: underline; }
.em_red a { color: #8c1515; text-decoration: none; }
.em_green a { color: #007c92; text-decoration: none; }
.em_announcement {
    background: #007C92;
    background: linear-gradient(127deg, #007C92 0%, #09425A 100%);
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    padding: 12px;
    text-align: center;
    width: auto;
}
.em_section_table_round_corner {
    border-collapse: collapse;
    border-radius: 12px;
    margin-bottom: 20px;
    overflow: hidden;
}
.em_section_title {
    background: #8C1515;
    background: linear-gradient(127deg, #8C1515 0%, #651C32 100%);
    color: #ffffff;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 25px;
    font-weight: bold;
    padding: 12px 0;
}
.em_section_table {
    background-color: #F4F4F4;
    color: #333333;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 16px;
    padding: 10px 25px 5px 25px;
}
.em_section_table_event_by_day,
.em_section_table_oncall,
.em_section_table_ooo_by_day {
    padding: 10px 0 15px 0;
}
.em_zoom_meeting_link { margin-left: 10px; }
.em_section_table_event_day,
.em_section_table_oncall_service {
    border-bottom: 1px solid #DAD7CB;
    color: #333333;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-weight: bold;
    font-size: 18px;
    padding: 0 0 6px 0;
    white-space: nowrap;
}
.em_section_table_event_day_icon,
.em_section_table_oncall_icon {
    color: #8c1515;
    margin-right: 5px;
}
.em_section_table_event_time {
    color: #333333;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 16px;
    width: 85px;
    padding: 8px 8px 4px 0;
    white-space: nowrap;
}
.em_section_table_oncall_date {
    color: #333333;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 16px;
    width: 150px;
    padding: 8px 8px 4px 0;
    white-space: nowrap;
}
.em_section_table_event_time_icon,
.em_section_table_oncall_date_icon {
    color: #AABEC6;
    margin-right: 5px;
}
.em_section_table_event_detail,
.em_section_table_oncall_detail {
    color: #333333;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 16px;
    padding: 8px 0 4px 0;
}
.em_section_table_event_detail a {
    color: #007C92;
    text-decoration: underline;
}
@media only screen and (max-width:649px) {
    .em_main_table { width: 100% !important; }
}
@media only screen and (max-width:649px) {
    .em_wrapper { width: 100% !important; }
}
@media only screen and (max-width:649px) {
    u+.em_body .em_full_wrap { width: 100vw !important; }
}
`;

function wrapEmailDocument(bodyHtml, subject) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG />
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
<title>${subject}</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="x-ua-compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="format-detection" content="telephone=no">
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,900&display=swap" rel="stylesheet">
<!--<![endif]-->
</head>
<body bgcolor="#eeeeee" class="em_body" style="margin:0px auto; padding:0px; background-color:#eeeeee;">
${bodyHtml}
</body>
</html>`;
}

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const { html, subject } = JSON.parse(event.body);

    if (!html || !subject) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required fields: html, subject' }),
        };
    }

    const fullDocument = wrapEmailDocument(html, subject);
    const inlinedHtml = juice.inlineContent(fullDocument, EMAIL_CSS).replace(
        '</head>',
        `<style type="text/css">
${EMAIL_CSS}
table { mso-table-lspace: 0; mso-table-rspace: 0; }
td, a, span { mso-line-height-rule: exactly; }
</style>
</head>`
    );

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const [response] = await sgMail.send({
            from: process.env.SENDGRID_FROM_EMAIL,
            to: process.env.SENDGRID_RECIPIENTS,
            subject,
            html: inlinedHtml,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, statusCode: response.statusCode }),
        };
    } catch (err) {
        const message = err.response?.body?.errors?.[0]?.message || err.message;
        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
};
