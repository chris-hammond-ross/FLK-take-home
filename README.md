# FLK Take Home - Applicant Form

A React / TypeScript application for capturing one or more applicants, built with Vite and Mantine.

<img width="1425" height="887" alt="screenshot" src="https://raw.githubusercontent.com/chris-hammond-ross/FLK-take-home/refs/heads/main/public/screenshot.jpg" />

## Getting Started

```bash
npm install
npm start
```

The application will be available by default at `http://localhost:5173`

## Features

- Add and remove applicants (minimum of one required)
- Capture first name, last name, mobile number, and email for each applicant
- Designate one applicant as the primary applicant (exactly one required)
- Automatic primary reassignment when the current primary is deleted
- Light and dark theme based on system prefences
- Responsive to both desktop and mobile
- Simple form validation

## Assumptions

1. **Validation**: I've added simple validation assuming the data types format, using Mantine's built in useForm hook, this is easily extendable based on the required data types.

2. **Primary applicant behaviour**: When the primary applicant is deleted, the first remaining applicant automatically becomes primary. This ensures the "exactly one primary" rule is always satisfied.

3. **Form submission**: Since backend integration was out of scope, the form currently logs the data to the console and shows a notification. This just demonstrates the data captured.

4. **No persistence**: Form data is held in component state and is not persisted to local storage or a backend.

5. **Mobile number format**: No specific format or country code requirements were assumed for the mobile number field, just the normal 10 number mobile format.

6. **Colours & Theme**: No design system colours were assumed, only default Mantine colours were used. The theme defaults to the OS default (light or dark), but can be changed by clicking the Light/Dark toggle. The toggle button is there just to test the two different themes available.

7. **Responsive Styling**: Some device conditional styles have been applied to the components. Try it out by using the mobile view in dev tools.

8. **Tests**: No tests have been created, since they were out of scope for this project.

## Tech Stack

- React 19
- TypeScript
- Vite
- Mantine
- Lucide Icons

## Project Structure

```
src/
├── components/
│   ├── ApplicantForm.tsx      # Individual applicant card
│   ├── ApplicantsManager.tsx  # Manages list of applicants
│   └── index.ts
├── types/
│   ├── applicant.ts           # TypeScript interfaces
│   └── index.ts
├── App.tsx                    # Main app with MantineProvider
└── main.tsx                   # Entry point
```
