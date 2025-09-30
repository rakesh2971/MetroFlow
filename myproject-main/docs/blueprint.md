# **App Name**: MetroFlow

## Core Features:

- User Authentication: Secure login with Firebase Auth (email/password, Google SSO) and role-based access control (admin, supervisor, viewer).
- Induction List Display: Display a table of trainsets with their status (service, standby, IBL) and associated constraints via badges (missing certificates, open job card, cleaning needed).
- Constraint Reasoning: Show the reasoning behind the trainset assignments via popovers or expandable rows in the induction list table, displaying the underlying JSON data (fitness score, branding score, mileage balancing, etc.).
- Manual Induction Override: Allow authorized users (admins, supervisors) to manually reorder the induction list via drag-and-drop and store these changes in Firestore with full audit logs.
- Fleet KPI Monitoring: Display key performance indicators (KPIs) such as fleet availability percentage, branding exposure percentage, and unscheduled withdrawals risk on a dashboard page, using data aggregated from Firestore.
- Conflict Detection and Alerting: Nightly checks for expiring certificates, overdue cleanings slots tool that trigger alerts which will incorporate user roles and existing train data.

## Style Guidelines:

- Primary color: Deep Indigo (#663399), reminiscent of rail infrastructure and evoking a sense of reliability.
- Background color: Light Gray (#F0F0F0), to give good contrast with the Deep Indigo primary and give a clean uncluttered feel.
- Accent color: Teal (#008080) to create an active app experience and call attention to details.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern look suitable for both headlines and body text.
- Use flat, minimalist icons to represent different trainset states and constraint types.
- Employ a clean, grid-based layout for the induction list and stabling yard map to enhance usability and information density.
- Use subtle transitions and animations for drag-and-drop actions and data updates to provide visual feedback.