# HabitPulse

Live demo placeholder: https://habitpulse.vercel.app

HabitPulse is a modern, calm, and fully stateless habit tracker web app built with Next.js, React, and Tailwind CSS.

Tagline: "Build better routines, one day at a time."

## Problem Statement

Users often want to build good habits such as drinking water, exercising, reading, meditating, sleeping early, or studying consistently. However, they lose track of daily progress when habits are not organized clearly. HabitPulse solves this by providing a simple, beautiful, stateless dashboard where users can add habits, mark them as completed for today, and view their daily completion progress.

## Objectives

- Provide a simple dashboard to temporarily track daily habits.
- Let users add, complete, undo, filter, and delete habits during the current browser session.
- Display useful daily progress summaries and motivational messages.
- Keep the app stateless and easy to explain for an academic viva.
- Make the project deployable directly on Vercel without backend setup.

## Features Implemented

- Add habits with name, category, target frequency, priority, and optional note.
- Categories: Health, Fitness, Study, Mindfulness, Productivity, Sleep, Reading, Personal.
- Priority options: Low, Medium, High.
- Frequency options: Daily, Weekdays, Weekends, Custom.
- Mark habits as done today, undo completion, and delete habits.
- Dashboard summary cards for total habits, completed today, pending today, and completion rate.
- Circular progress indicator and progress bar for today's completion rate.
- Motivational microcopy based on progress.
- Filters for All, Completed, Pending, and High Priority habits.
- Load Demo Data and Clear All controls.
- Friendly form validation messages.
- Inline success messages after adding habits or loading demo data.
- Helpful empty state with a demo loading button.
- Responsive premium wellness-focused UI.
- Optional dark mode toggle using React state only.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- lucide-react icons
- Vercel-ready app router structure

## Frontend Implementation

The application is implemented as a client-side React page in `src/app/page.tsx`. It uses reusable UI sections for summary cards, form fields, habit cards, and the empty state. Dashboard values are calculated dynamically from the current React state.

Each habit contains:

- `id`
- `name`
- `category`
- `frequency`
- `priority`
- `note`
- `completedToday`
- `createdAt`

Completion rate is calculated as:

```text
completed habits / total habits * 100
```

## Backend and State Handling

There is no backend in this project. The app does not require authentication, server routes, environment variables, or external API calls.

This is a stateless prototype. All habit data is stored temporarily using React useState and resets on page refresh.

The app intentionally does not use:

- Database
- localStorage
- sessionStorage
- Cookies
- IndexedDB
- Backend persistence
- External APIs

## Database and Stateless Behavior

HabitPulse stores all user-created habit data only in React component state through `useState`. Demo habits are also loaded into React state only when the user clicks the Load Demo Data button.

When the page is refreshed, React state is recreated from scratch, so all added habits and loaded demo habits disappear. This behavior is intentional and matches the assignment requirement.

## Deployment Steps for Vercel

1. Push the project to a GitHub repository.
2. Open Vercel and choose Add New Project.
3. Import the GitHub repository.
4. Keep the default Next.js settings.
5. Click Deploy.

No environment variables, database URLs, or backend configuration are required.

## How to Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

## Project Output

The final output is a fully responsive HabitPulse dashboard where users can:

- Add daily habits.
- Mark habits as complete.
- Undo completed habits.
- Delete habits.
- Load sample demo habits.
- Clear all current habits.
- View total, completed, pending, and completion rate statistics.
- Filter habits by completion and priority.

## Limitations

- Data is not saved after refresh because the project is intentionally stateless.
- There are no user accounts or authentication.
- Historical streaks and weekly analytics are not stored.
- The app does not sync across devices.

## Future Enhancements

- Optional account-based habit history.
- Calendar and streak tracking.
- Weekly and monthly analytics.
- Reminder notifications.
- Exportable habit reports.
- Cloud sync with a database for a non-stateless production version.

## Conclusion

HabitPulse demonstrates how a wellness-focused habit tracker can feel complete and polished while staying fully stateless. It is suitable as a prototype, academic project, or Vercel-deployable frontend demo.

## References

- Next.js documentation: https://nextjs.org/docs
- React documentation: https://react.dev
- Tailwind CSS documentation: https://tailwindcss.com/docs
- Vercel deployment documentation: https://vercel.com/docs
- lucide-react icons: https://lucide.dev
