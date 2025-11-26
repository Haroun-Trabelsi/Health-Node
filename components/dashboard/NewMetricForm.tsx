'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface MetricFormState {
  date: string;
  weight: string;
  heartRate: string;
  sleepHours: string;
  activityMinutes: string;
  notes: string;
}

const initialFormState = (): MetricFormState => ({
  date: new Date().toISOString().slice(0, 10),
  weight: '',
  heartRate: '',
  sleepHours: '',
  activityMinutes: '',
  notes: ''
});

export const NewMetricForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<MetricFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof MetricFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormState(initialFormState());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formState.date,
          weight: Number(formState.weight),
          heartRate: Number(formState.heartRate),
          sleepHours: Number(formState.sleepHours),
          activityMinutes: Number(formState.activityMinutes),
          notes: formState.notes || undefined
        })
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error ?? 'Failed to create metric');
      }

      resetForm();
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create metric');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="metric-date">
          Date
        </label>
        <input
          id="metric-date"
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          max={new Date().toISOString().slice(0, 10)}
          onChange={(event) => handleChange('date', event.target.value)}
          required
          type="date"
          value={formState.date}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="metric-weight">
            Weight (kg)
          </label>
          <input
            id="metric-weight"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            min={0}
            onChange={(event) => handleChange('weight', event.target.value)}
            placeholder="72.5"
            required
            step="0.1"
            type="number"
            value={formState.weight}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="metric-heartRate">
            Heart Rate (bpm)
          </label>
          <input
            id="metric-heartRate"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            min={0}
            onChange={(event) => handleChange('heartRate', event.target.value)}
            placeholder="60"
            required
            type="number"
            value={formState.heartRate}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="metric-sleep">
            Sleep (hours)
          </label>
          <input
            id="metric-sleep"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            min={0}
            onChange={(event) => handleChange('sleepHours', event.target.value)}
            placeholder="7.5"
            required
            step="0.1"
            type="number"
            value={formState.sleepHours}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="metric-activity">
            Activity (minutes)
          </label>
          <input
            id="metric-activity"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            min={0}
            onChange={(event) => handleChange('activityMinutes', event.target.value)}
            placeholder="45"
            required
            type="number"
            value={formState.activityMinutes}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-500" htmlFor="metric-notes">
          Notes
        </label>
        <textarea
          id="metric-notes"
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          maxLength={500}
          onChange={(event) => handleChange('notes', event.target.value)}
          placeholder="How did you feel today?"
          rows={3}
          value={formState.notes}
        />
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting || isPending}
        type="submit"
      >
        {isSubmitting ? 'Saving...' : 'Add daily entry'}
      </button>
    </form>
  );
};


