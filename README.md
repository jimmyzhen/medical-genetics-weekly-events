# Medical Genetics Weekly Events

A Next.js web app for composing and sending the Stanford Division of Medical Genetics weekly events newsletter.

Users fill out a form with weekly events, on-call schedules, and out-of-office info. The form submits to Netlify Forms, and a preview page renders an email-style preview. The preview page includes a "Send Email" button that sends the newsletter to a distribution list.

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

For full functionality (Netlify Functions, environment variables, form submissions):

```bash
netlify dev
```

Opens on [http://localhost:8888](http://localhost:8888).

**Do not run `yarn build` locally** (per team convention).

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Main form — weekly events, on-call schedules, out-of-office |
| `/preview` | Renders the latest submission as an email preview. Edit or send from here. |
| `/history` | Browse all past submissions with click-to-view |
| `/success` | Post-submission confirmation |
| `/login` | Password login gate |

## Key Features

### Form Submission

The form submits natively to Netlify Forms via `POST`. Fields follow the naming convention `{service}_{role}_{index}` (e.g., `nutritionist_nutritionist_0_value`). Multi-select values are JSON-stringified arrays.

### Draft Saving

Browser `localStorage`-based draft system (key: `mg-weekly-events-draft`). Two entry points:

- **Save Draft** button on the form page — serializes the form and stores it locally
- **Edit** button on the preview page — writes the latest submission data to `localStorage` and redirects to the form with all fields pre-populated

Drafts are per-browser/per-device. No server-side storage.

### Email Preview & Sending

The preview page fetches the latest submission from the Netlify Forms API and renders it using `PreviewEmail`, which generates email-compatible HTML with table-based layout and inline styles.

Sending wraps the HTML in an email document, inlines CSS with `juice`, and sends via SendGrid.

### Newsletter History

The history page fetches all submissions from the Netlify Forms API, displays them sorted by date, and lets you click into any submission to view its rendered preview.

### Authentication

Shared-password auth gate. Password validated server-side via a Netlify Function, session maintained with an HTTP-only HMAC-signed cookie. All pages except `/login` are protected.

## Architecture

```
pages/
  index.js          — Form page (renders FeedbackForm)
  preview.js        — Email preview + send + edit
  history.js        — Submission history list + detail view
  success.js        — Post-submission confirmation
  login.js          — Login page
  _app.js           — Auth gate wrapper

components/
  FeedbackForm.js   — Main form with draft save/load
  Event.js          — Single event row (time, title, zoom)
  EventWeekday.js   — Weekday container with events
  OnCallService.js  — Date + attending + resident (simple services)
  OnCallServiceItem.js        — Single row for multi-entry services
  OnCallServiceMultiSelect.js — Multi-entry service container
  OnCallServiceNoDate.js      — Multi-select without dates
  PreviewEmail.js   — Email-compatible HTML renderer
  Header.js         — Nav links (Form, Preview, History) + Sign Out
  Footer.js         — Logo footer

data/
  WeeklyEvents.js       — Static recurring events (Mon-Fri)
  OnCallServiceStaff.js — Staff rosters
  OnCallServiceEntries.js — Entry row counts per service

netlify/functions/
  send-email.js  — CSS inlining + SendGrid delivery
  login.js       — Password validation + cookie setting
  auth-check.js  — Cookie verification
  logout.js      — Cookie clearing
```

### Path Aliases

Defined in `jsconfig.json`:
- `@components/*` → `components/*`
- `@styles/*` → `styles/*`

### Styling

- CSS Modules (`*.module.css`) for component-scoped styles
- `public/preview.css` — Email-specific CSS, loaded only on preview/history detail pages
- `styles/globals.css` — Global styles imported in `_app.js`

## Environment Variables

**Client-side** (prefixed with `NEXT_PUBLIC_`):
- `NEXT_PUBLIC_FORM_API` — Netlify Forms API endpoint for fetching submissions
- `NEXT_PUBLIC_FORM_API_AUTH` — Bearer token for the Netlify Forms API

**Server-side** (set in Netlify dashboard only):
- `SENDGRID_API_KEY` — SendGrid API key
- `SENDGRID_RECIPIENTS` — Distribution list email address
- `SENDGRID_FROM_EMAIL` — Verified sender address
- `APP_PASSWORD` — Shared password for app access
- `APP_SECRET` — Secret for HMAC cookie signing

## Testing

End-to-end tests use [Cypress](https://www.cypress.io/) and run during Netlify deploys via `netlify-plugin-cypress`.

```bash
npx cypress open  # requires netlify dev running on port 8888
```

Tests are in `cypress/e2e/basic.cy.js`.

## Deployment

Hosted on Netlify with `@netlify/plugin-nextjs`. Netlify Forms handles form submissions. Serverless functions in `netlify/functions/`. API routes redirect via `netlify.toml` (`/api/*` → `/.netlify/functions/:splat`).
