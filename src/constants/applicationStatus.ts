import { ApplicationStatus } from '../types'

/** Solid fill color for progress bars, dots, chart bars */
export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-500',
  interview: 'bg-amber-400',
  offer: 'bg-emerald-500',
  rejected: 'bg-red-400',
  withdrawn: 'bg-gray-300',
}

/** Text color per status */
export const STATUS_TEXT: Record<ApplicationStatus, string> = {
  applied: 'text-blue-600',
  interview: 'text-amber-600',
  offer: 'text-emerald-600',
  rejected: 'text-red-500',
  withdrawn: 'text-gray-500',
}

/** Light background color per status */
export const STATUS_BG: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-50',
  interview: 'bg-amber-50',
  offer: 'bg-emerald-50',
  rejected: 'bg-red-50',
  withdrawn: 'bg-gray-50',
}

export const STATUS_CONFIG: Record<ApplicationStatus, { label: string; className: string }> = {
  applied: {
    label: 'Applied',
    className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  },
  interview: {
    label: 'Interview',
    className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  },
  offer: {
    label: 'Offer',
    className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  },
  withdrawn: {
    label: 'Withdrawn',
    className: 'bg-gray-100 text-gray-500 ring-1 ring-gray-200',
  },
}

export const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = Object.entries(
  STATUS_CONFIG,
).map(([value, { label }]) => ({ value: value as ApplicationStatus, label }))
