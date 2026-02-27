import { JobApplication } from '../../types'
import StatusBadge from './StatusBadge'
import { EditIcon, TrashIcon } from '../icons'

interface Props {
  applications: JobApplication[]
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
    <div className="flex flex-col items-center justify-center py-20 text-center">
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

export default function ApplicationsTable({ applications }: Props) {
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
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Company</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Position</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Status</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Applied</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Notes</th>
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {applications.map(app => (
            <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-900">{app.company}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{app.position}</span>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-500">{formatDate(app.applied_date)}</span>
              </td>
              <td className="px-6 py-4 max-w-xs">
                <span className="text-sm text-gray-400 truncate block">
                  {app.notes || <span className="italic">—</span>}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 justify-end">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <EditIcon />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
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
