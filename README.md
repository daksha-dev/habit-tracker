# HabitPulse – Stateless Habit Tracker

HabitPulse is a modern, calm, and fully stateless habit tracker web application built using Next.js, React, TypeScript, Tailwind CSS, and lucide-react icons.

The application helps users temporarily track daily habits, mark them as completed, view daily progress, and stay motivated through a clean wellness-focused dashboard.

This project was developed as part of the **Modern Application Development – CSD303A Assignment Part 2: Full Stack Application Mini Project**.

---

## Live Demo

Deployed Website:  
https://habitpulse.vercel.app

> Replace this link with your actual Vercel deployment link if different.

---

## Project Overview

HabitPulse is designed for users who want a simple and visually organized way to track daily habits such as drinking water, exercising, reading, meditating, studying, or sleeping early.

The application allows users to add habits, mark them as done for the day, undo completion, delete habits, filter habit cards, and view daily completion progress.

HabitPulse is intentionally built as a stateless prototype. All habit data is stored temporarily using React state and resets automatically when the page is refreshed.

---

## Tagline

**Build better routines, one day at a time.**

---

## Problem Statement

Users often want to build good habits such as drinking water, exercising, reading, meditating, sleeping early, or studying consistently. However, they may lose track of daily progress when habits are not organized clearly.

HabitPulse solves this problem by providing a simple, beautiful, and stateless habit tracking dashboard where users can add habits, mark them as completed for today, and view their daily completion progress in one place.

---

## Objectives

- To design a modern and responsive habit tracking dashboard.
- To allow users to temporarily add, complete, undo, filter, and delete habits.
- To display daily habit completion statistics.
- To provide motivational feedback based on progress.
- To demonstrate frontend development using Next.js, React, TypeScript, and Tailwind CSS.
- To simulate temporary data handling using React state.
- To deploy the application successfully using Vercel.

---

## Features Implemented

### Habit Management

Users can add habits with the following details:

- Habit name
- Category
- Target frequency
- Priority
- Optional note

Users can also:

- Mark habits as done today
- Undo completed habits
- Delete habits
- Filter habits by status and priority

---

### Categories

The application supports the following habit categories:

- Health
- Fitness
- Study
- Mindfulness
- Productivity
- Sleep
- Reading
- Personal

---

### Priority Levels

Each habit can be assigned one of the following priority levels:

- Low
- Medium
- High

---

### Target Frequency

Habits can be assigned a target frequency:

- Daily
- Weekdays
- Weekends
- Custom

---

### Dashboard Summary

The dashboard displays:

- Total Habits
- Completed Today
- Pending Today
- Completion Rate

---

### Progress Tracking

HabitPulse includes a daily progress section that shows:

- Circular progress indicator
- Progress bar
- Completion percentage
- Motivational message based on progress

Motivational messages include:

- 0%: Start small. One habit is enough.
- 1–49%: Good start. Keep going.
- 50–99%: You’re building momentum.
- 100%: Perfect day. All habits completed.

---

### Filters

Users can filter habits by:

- All
- Completed
- Pending
- High Priority

---

### Demo Controls

The app includes:

- Load Demo Data button
- Clear All button
- Demo mode note showing that habits reset on refresh

---

### User Experience

- Friendly validation messages
- Inline success messages
- Helpful empty state
- Responsive design for mobile, tablet, and desktop
- Calm wellness-focused interface
- Premium card-based layout
- Optional dark mode toggle using React state only

---

## Tech Stack

| Area | Technology Used |
|---|---|
| Framework | Next.js |
| Frontend Library | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| State Handling | React `useState` |
| Deployment | Vercel |

---

## Frontend Implementation

The frontend is implemented using Next.js and React with TypeScript. The main application page is built as a client-side React component and contains reusable UI sections for habit forms, dashboard cards, progress display, filter buttons, habit cards, and empty states.

Tailwind CSS is used to create a clean, responsive, and polished wellness-style interface.

Key frontend sections include:

- Header section
- Summary dashboard cards
- Add habit form
- Daily progress card
- Habit filter tabs
- Habit cards grid
- Empty state section
- Demo data controls

---

## Habit Data Structure

Each habit contains the following fields:

```ts
{
  id: string;
  name: string;
  category: string;
  frequency: string;
  priority: string;
  note: string;
  completedToday: boolean;
  createdAt: string;
}
