'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import type { IDailyMetric } from '@/models/DailyMetric';

interface MetricTableProps {
  metrics: IDailyMetric[];
}

interface MetricEditState {
  date: string;
  weight: string;
  heartRate: string;
  sleepHours: string;
  activityMinutes: string;
  notes: string;
}

const toISODate = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
};

export const MetricTable = ({ metrics }: MetricTableProps) => {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<MetricEditState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const beginEdit = (metric: IDailyMetric) => {
    setEditingId(metric._id?.toString() ?? '');
    setEditValues({
      date: toISODate(metric.date),
      weight: metric.weight.toString(),
      heartRate: metric.heartRate.toString(),
      sleepHours: metric.sleepHours.toString(),
      activityMinutes: metric.activityMinutes.toString(),
      notes: metric.notes ?? ''
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues(null);
    setError(null);
  };

  const handleEditChange = (field: keyof MetricEditState, value: string) => {
    setEditValues((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingId || !editValues) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/metrics/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: editValues.date,
          weight: Number(editValues.weight),
          heartRate: Number(editValues.heartRate),
          sleepHours: Number(editValues.sleepHours),
          activityMinutes: Number(editValues.activityMinutes),
          notes: editValues.notes || undefined
        })
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.error ?? 'Failed to update metric');
      }

      cancelEdit();
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update metric');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Recent Entries</h3>
        <p className="text-xs text-slate-500">Edit entries inline</p>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Weight</th>
              <th className="px-2 py-1">Heart Rate</th>
              <th className="px-2 py-1">Sleep</th>
              <th className="px-2 py-1">Activity</th>
              <th className="px-2 py-1">Notes</th>
              <th className="px-2 py-1 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              const metricId = metric._id?.toString() ?? toISODate(metric.date);
              const isEditing = editingId === metricId;

              if (isEditing && editValues) {
                return (
                  <tr key={metricId} className="border-t border-slate-100">
                    <td colSpan={7} className="px-2 py-3">
                      <form className="space-y-3" onSubmit={handleUpdate}>
                        <div className="grid gap-3 md:grid-cols-3">
                          <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            Date
                            <input
                              className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none"
                              onChange={(event) => handleEditChange('date', event.target.value)}
                              required
                              type="date"
                              value={editValues.date}
                            />
                          </label>
                          <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            Weight (kg)
                            <input
                              className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none"
                              min={0}
                              onChange={(event) => handleEditChange('weight', event.target.value)}
                              required
                              step="0.1"
                              type="number"
                              value={editValues.weight}
                            />
                          </label>
                          <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            Heart Rate (bpm)
                            <input
                              className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none"
                              min={0}
                              onChange={(event) => handleEditChange('heartRate', event.target.value)}
                              required
                              type="number"
                              value={editValues.heartRate}
                            />
                          </label>
                          <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            Sleep (hrs)
                            <input
                              className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none"
                              min={0}
                              onChange={(event) => handleEditChange('sleepHours', event.target.value)}
                              required
                              step="0.1"
                              type="number"
                              value={editValues.sleepHours}
                            />
                          </label>
                          <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            Activity (min)
                            <input
                              className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none"
                              min={0}
                              onChange={(event) => handleEditChange('activityMinutes', event.target.value)}
                              required
                              type="number"
                              value={editValues.activityMinutes}
                            />
                          </label>
                        </div>
                        <label className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                          Notes
                          <textarea
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-slate-900 focus:outline-none"
                            maxLength={500}
                            onChange={(event) => handleEditChange('notes', event.target.value)}
                            rows={3}
                            value={editValues.notes}
                          />
                        </label>
                        {error ? <p className="text-sm text-red-500">{error}</p> : null}
                        <div className="flex items-center gap-3">
                          <button
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                            disabled={isSubmitting || isPending}
                            type="submit"
                          >
                            {isSubmitting ? 'Saving...' : 'Save changes'}
                          </button>
                          <button
                            className="text-sm font-medium text-slate-500 hover:text-slate-900"
                            onClick={cancelEdit}
                            type="button"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={metricId} className="border-t border-slate-100">
                  <td className="px-2 py-2 font-medium text-slate-900">{new Date(metric.date).toLocaleDateString()}</td>
                  <td className="px-2 py-2">{metric.weight} kg</td>
                  <td className="px-2 py-2">{metric.heartRate} bpm</td>
                  <td className="px-2 py-2">{metric.sleepHours} hrs</td>
                  <td className="px-2 py-2">{metric.activityMinutes} min</td>
                  <td className="px-2 py-2 text-slate-500">{metric.notes ?? '—'}</td>
                  <td className="px-2 py-2 text-right">
                    <button
                      className="text-sm font-semibold text-slate-900 hover:underline"
                      onClick={() => beginEdit(metric)}
                      type="button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
            {!metrics.length && (
              <tr>
                <td className="px-2 py-4 text-center text-slate-500" colSpan={7}>
                  No metrics yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
