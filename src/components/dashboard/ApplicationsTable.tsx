import { JobApplication } from '../../types'
import StatusBadge from './StatusBadge'
import { EditIcon, TrashIcon } from '../icons'

interface Props {
  applications: JobApplication[]
  onEdit: (app: JobApplication) => void
  onDelete: (app: JobApplication) => void
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
  'bg-orange-100 text-orange-700',
  'bg-indigo-100 text-indigo-700',
]

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">No applications yet</p>
      <p className="text-xs text-gray-400">Add your first job application to get started.</p>
    </div>
  )
}

export default function ApplicationsTable({ applications, onEdit, onDelete }: Props) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3.5">Company</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3.5">Status</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3.5">Applied</th>
            <th className="w-20 px-6 py-3.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {applications.map(app => (
            <tr key={app.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
              {/* Company + Position + Notes */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${getAvatarColor(app.company)}`}>
                    {app.company[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{app.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{app.position}</p>
                    {app.notes && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs italic">{app.notes}</p>
                    )}
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <StatusBadge status={app.status} />
              </td>

              {/* Date */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500">{formatDate(app.applied_date)}</span>
              </td>

              {/* Actions — only visible on row hover */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={() => onEdit(app)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => onDelete(app)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
