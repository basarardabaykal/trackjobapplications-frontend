import { ApplicationStatus } from '../../types'

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; className: string }> = {
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

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
