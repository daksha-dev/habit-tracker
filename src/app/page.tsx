"use client";

import {
  Activity,
  Bed,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Circle,
  Droplets,
  Dumbbell,
  Flame,
  GraduationCap,
  Leaf,
  Moon,
  Plus,
  RefreshCw,
  Sparkles,
  Sun,
  Target,
  Trash2,
  Undo2,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type Category =
  | "Health"
  | "Fitness"
  | "Study"
  | "Mindfulness"
  | "Productivity"
  | "Sleep"
  | "Reading"
  | "Personal";

type Priority = "Low" | "Medium" | "High";
type Frequency = "Daily" | "Weekdays" | "Weekends" | "Custom";
type Filter = "All" | "Completed" | "Pending" | "High Priority";

type Habit = {
  id: number;
  name: string;
  category: Category;
  frequency: Frequency;
  priority: Priority;
  note: string;
  completedToday: boolean;
  createdAt: string;
};

type FormState = {
  name: string;
  category: "" | Category;
  frequency: "" | Frequency;
  priority: "" | Priority;
  note: string;
};

const categories: Category[] = [
  "Health",
  "Fitness",
  "Study",
  "Mindfulness",
  "Productivity",
  "Sleep",
  "Reading",
  "Personal",
];

const priorities: Priority[] = ["Low", "Medium", "High"];
const frequencies: Frequency[] = ["Daily", "Weekdays", "Weekends", "Custom"];
const filters: Filter[] = ["All", "Completed", "Pending", "High Priority"];

const emptyForm: FormState = {
  name: "",
  category: "",
  frequency: "",
  priority: "",
  note: "",
};

const categoryMeta: Record<
  Category,
  { Icon: LucideIcon; color: string; badge: string }
> = {
  Health: {
    Icon: Droplets,
    color: "text-sky-600",
    badge: "bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-800/70",
  },
  Fitness: {
    Icon: Dumbbell,
    color: "text-rose-600",
    badge:
      "bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800/70",
  },
  Study: {
    Icon: GraduationCap,
    color: "text-indigo-600",
    badge:
      "bg-indigo-50 text-indigo-700 ring-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-200 dark:ring-indigo-800/70",
  },
  Mindfulness: {
    Icon: Brain,
    color: "text-violet-600",
    badge:
      "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-950/40 dark:text-violet-200 dark:ring-violet-800/70",
  },
  Productivity: {
    Icon: BriefcaseBusiness,
    color: "text-amber-600",
    badge:
      "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800/70",
  },
  Sleep: {
    Icon: Bed,
    color: "text-blue-600",
    badge:
      "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-200 dark:ring-blue-800/70",
  },
  Reading: {
    Icon: BookOpen,
    color: "text-emerald-600",
    badge:
      "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800/70",
  },
  Personal: {
    Icon: UserRound,
    color: "text-teal-600",
    badge:
      "bg-teal-50 text-teal-700 ring-teal-100 dark:bg-teal-950/40 dark:text-teal-200 dark:ring-teal-800/70",
  },
};

const priorityStyles: Record<Priority, string> = {
  Low: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700",
  Medium:
    "bg-orange-50 text-orange-700 ring-orange-100 dark:bg-orange-950/40 dark:text-orange-200 dark:ring-orange-800/70",
  High: "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/40 dark:text-red-200 dark:ring-red-800/70",
};

const demoHabits: Omit<Habit, "id" | "createdAt">[] = [
  {
    name: "Drink 2L Water",
    category: "Health",
    frequency: "Daily",
    priority: "High",
    note: "Keep a bottle nearby through study sessions.",
    completedToday: true,
  },
  {
    name: "Morning Walk",
    category: "Fitness",
    frequency: "Daily",
    priority: "Medium",
    note: "A calm 20-minute walk after waking up.",
    completedToday: false,
  },
  {
    name: "Read 10 Pages",
    category: "Reading",
    frequency: "Daily",
    priority: "Medium",
    note: "Pick any book that feels easy to continue.",
    completedToday: true,
  },
  {
    name: "Meditate 5 Minutes",
    category: "Mindfulness",
    frequency: "Daily",
    priority: "Low",
    note: "Breathe before checking notifications.",
    completedToday: false,
  },
  {
    name: "Study DSA",
    category: "Study",
    frequency: "Weekdays",
    priority: "High",
    note: "Solve one focused problem.",
    completedToday: false,
  },
  {
    name: "Sleep Before 11 PM",
    category: "Sleep",
    frequency: "Daily",
    priority: "High",
    note: "Dim screens and wrap up early.",
    completedToday: false,
  },
];

function createDemoHabits(): Habit[] {
  const now = new Date().toISOString();

  return demoHabits.map((habit, index) => ({
    ...habit,
    id: Date.now() + index,
    createdAt: now,
  }));
}

function getMotivation(rate: number) {
  if (rate === 0) return "Start small. One habit is enough.";
  if (rate < 50) return "Good start. Keep going.";
  if (rate < 100) return "You're building momentum.";
  return "Perfect day. All habits completed.";
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [filter, setFilter] = useState<Filter>("All");
  const [message, setMessage] = useState("");
  const [isDark, setIsDark] = useState(false);

  const completedCount = habits.filter((habit) => habit.completedToday).length;
  const pendingCount = habits.length - completedCount;
  const completionRate =
    habits.length === 0 ? 0 : Math.round((completedCount / habits.length) * 100);

  const filteredHabits = useMemo(() => {
    if (filter === "Completed") {
      return habits.filter((habit) => habit.completedToday);
    }

    if (filter === "Pending") {
      return habits.filter((habit) => !habit.completedToday);
    }

    if (filter === "High Priority") {
      return habits.filter((habit) => habit.priority === "High");
    }

    return habits;
  }, [filter, habits]);

  function updateForm(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Habit name is required.";
    if (!form.category) nextErrors.category = "Category is required.";
    if (!form.priority) nextErrors.priority = "Priority is required.";
    if (!form.frequency) nextErrors.frequency = "Frequency is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleAddHabit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      setMessage("");
      return;
    }

    const habit: Habit = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category as Category,
      frequency: form.frequency as Frequency,
      priority: form.priority as Priority,
      note: form.note.trim(),
      completedToday: false,
      createdAt: new Date().toISOString(),
    };

    setHabits((current) => [habit, ...current]);
    setForm(emptyForm);
    setMessage("Habit added. Your routine has one more steady pulse.");
  }

  function loadDemoData() {
    setHabits(createDemoHabits());
    setFilter("All");
    setMessage("Demo habits loaded. Try marking a few complete.");
  }

  function clearAll() {
    setHabits([]);
    setFilter("All");
    setMessage("All habits cleared. Fresh start ready.");
  }

  function toggleHabit(id: number) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? { ...habit, completedToday: !habit.completedToday }
          : habit,
      ),
    );
  }

  function deleteHabit(id: number) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
    setMessage("Habit deleted.");
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "dark bg-[#101815] text-slate-100"
          : "bg-[#f7f4ed] text-slate-950"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_20px_70px_rgba(82,74,56,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/15">
                <Activity className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    HabitPulse
                  </h1>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800/70">
                    Demo mode
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                  Build better routines, one day at a time.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-100 dark:bg-amber-950/30 dark:text-amber-100 dark:ring-amber-800/70">
                Demo mode: habits reset on refresh.
              </p>
              <button
                type="button"
                onClick={() => setIsDark((current) => !current)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:border-emerald-700"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
                {isDark ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Habits"
            value={habits.length}
            icon={Target}
            tone="emerald"
          />
          <SummaryCard
            label="Completed Today"
            value={completedCount}
            icon={CheckCircle2}
            tone="teal"
          />
          <SummaryCard
            label="Pending Today"
            value={pendingCount}
            icon={Circle}
            tone="amber"
          />
          <SummaryCard
            label="Completion Rate"
            value={`${completionRate}%`}
            icon={Flame}
            tone="rose"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleAddHabit}
            className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_60px_rgba(82,74,56,0.10)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06] sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Add a habit
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Capture one small routine and track it for today.
                </p>
              </div>
              <Sparkles
                className="h-6 w-6 text-emerald-600"
                aria-hidden="true"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Habit name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Drink 2L Water"
                  className="field-control"
                />
              </Field>

              <Field label="Category" error={errors.category}>
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateForm("category", event.target.value)
                  }
                  className="field-control"
                >
                  <option value="">Choose category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Target frequency" error={errors.frequency}>
                <select
                  value={form.frequency}
                  onChange={(event) =>
                    updateForm("frequency", event.target.value)
                  }
                  className="field-control"
                >
                  <option value="">Choose frequency</option>
                  {frequencies.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Priority" error={errors.priority}>
                <select
                  value={form.priority}
                  onChange={(event) =>
                    updateForm("priority", event.target.value)
                  }
                  className="field-control"
                >
                  <option value="">Choose priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Short note">
                  <textarea
                    value={form.note}
                    onChange={(event) => updateForm("note", event.target.value)}
                    placeholder="Optional reminder, cue, or reason"
                    rows={3}
                    className="field-control resize-none"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add Habit
              </button>
              <button
                type="button"
                onClick={loadDemoData}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 text-sm font-bold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-800/70 dark:bg-emerald-950/40 dark:text-emerald-100"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Load Demo Data
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={habits.length === 0}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-red-200 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear All
              </button>
            </div>

            {message && (
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-800/70">
                {message}
              </p>
            )}
          </form>

          <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(82,74,56,0.10)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Daily progress
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Today&apos;s completion pulse
                </p>
              </div>
              <CalendarDays className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="mt-8 flex flex-col items-center gap-6">
              <div
                className="grid h-52 w-52 place-items-center rounded-full shadow-inner"
                style={{
                  background: `conic-gradient(#047857 ${completionRate * 3.6}deg, ${
                    isDark ? "#24342f" : "#e5e1d7"
                  } 0deg)`,
                }}
              >
                <div className="grid h-40 w-40 place-items-center rounded-full bg-white text-center shadow-lg dark:bg-[#101815]">
                  <div>
                    <p className="text-5xl font-black tracking-tight">
                      {completionRate}%
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      complete
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-700 transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                  {getMotivation(completionRate)}
                </p>
              </div>
            </div>
          </section>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_18px_60px_rgba(82,74,56,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.05] sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Today&apos;s habits
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Filter, finish, undo, or remove habits for this session.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    filter === item
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-950"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-emerald-700 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {habits.length === 0 ? (
            <EmptyState onLoadDemo={loadDemoData} />
          ) : filteredHabits.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-lg font-bold">No habits match this filter.</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try another tab or add a habit with a different priority.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={() => toggleHabit(habit.id)}
                  onDelete={() => deleteHabit(habit.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone: "emerald" | "teal" | "amber" | "rose";
}) {
  const toneClasses = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200",
    teal: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200",
  };

  return (
    <article className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-[0_14px_45px_rgba(82,74,56,0.08)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
        </div>
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ${toneClasses[tone]}`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
    </label>
  );
}

function HabitCard({
  habit,
  onToggle,
  onDelete,
}: {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const meta = categoryMeta[habit.category];
  const Icon = meta.Icon;

  return (
    <article
      className={`group flex min-h-72 flex-col justify-between rounded-[1.5rem] border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        habit.completedToday
          ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-800/70 dark:bg-emerald-950/25"
          : "border-white/80 bg-white/90 dark:border-white/10 dark:bg-white/[0.06]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white shadow-sm dark:bg-white/10 ${meta.color}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3
                className={`text-lg font-black tracking-tight ${
                  habit.completedToday
                    ? "text-emerald-900 line-through decoration-emerald-400 decoration-2 dark:text-emerald-100"
                    : ""
                }`}
              >
                {habit.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {habit.frequency}
              </p>
            </div>
          </div>
          {habit.completedToday ? (
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
          ) : (
            <Circle className="h-6 w-6 shrink-0 text-slate-300 dark:text-slate-600" />
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${meta.badge}`}
          >
            {habit.category}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${priorityStyles[habit.priority]}`}
          >
            {habit.priority} Priority
          </span>
        </div>

        {habit.note && (
          <p className="mt-5 rounded-2xl bg-white/75 px-4 py-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            {habit.note}
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition hover:-translate-y-0.5 ${
            habit.completedToday
              ? "bg-white text-slate-700 ring-1 ring-slate-200 hover:text-amber-700 dark:bg-white/10 dark:text-slate-100 dark:ring-white/10"
              : "bg-emerald-700 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-800"
          }`}
        >
          {habit.completedToday ? (
            <Undo2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          )}
          {habit.completedToday ? "Undo" : "Mark Done"}
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${habit.name}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-red-600 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function EmptyState({ onLoadDemo }: { onLoadDemo: () => void }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-dashed border-emerald-200 bg-emerald-50/55 p-8 text-center dark:border-emerald-800/60 dark:bg-emerald-950/20">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-emerald-700 shadow-sm dark:bg-white/10 dark:text-emerald-200">
        <Leaf className="h-8 w-8" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-2xl font-black tracking-tight">
        Your habit board is ready.
      </h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        Add your first routine or load sample habits to see how HabitPulse tracks
        today&apos;s completion without saving anything after refresh.
      </p>
      <button
        type="button"
        onClick={onLoadDemo}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Load Demo Habits
      </button>
    </div>
  );
}
