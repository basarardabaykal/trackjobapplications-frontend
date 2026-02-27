import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import { ApplicationStatus, JobApplication } from '../types'

const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 1,
    company: 'Spotify',
    position: 'Senior Frontend Engineer',
    status: 'interview',
    applied_date: '2026-02-10',
    notes: 'Technical interview scheduled for next week',
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 2,
    company: 'Stripe',
    position: 'Software Engineer, Payments',
    status: 'applied',
    applied_date: '2026-02-15',
    notes: 'Applied via LinkedIn',
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-02-15T10:00:00Z',
  },
  {
    id: 3,
    company: 'Notion',
    position: 'Full Stack Engineer',
    status: 'offer',
    applied_date: '2026-01-28',
    notes: 'Offer received — reviewing terms',
    created_at: '2026-01-28T10:00:00Z',
    updated_at: '2026-01-28T10:00:00Z',
  },
  {
    id: 4,
    company: 'Figma',
    position: 'Frontend Engineer',
    status: 'rejected',
    applied_date: '2026-01-20',
    notes: 'Rejected after final round',
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-01-20T10:00:00Z',
  },
  {
    id: 5,
    company: 'Linear',
    position: 'Product Engineer',
    status: 'applied',
    applied_date: '2026-02-20',
    notes: '',
    created_at: '2026-02-20T10:00:00Z',
    updated_at: '2026-02-20T10:00:00Z',
  },
  {
    id: 6,
    company: 'Vercel',
    position: 'Developer Experience Engineer',
    status: 'interview',
    applied_date: '2026-02-12',
    notes: 'First round done, waiting for feedback',
    created_at: '2026-02-12T10:00:00Z',
    updated_at: '2026-02-12T10:00:00Z',
  },
]

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

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

interface StatCardProps {
  label: string
  value: number
  color: string
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

export default function DashboardPage() {
  const apps = MOCK_APPLICATIONS

  const stats = {
    total: apps.length,
    applied: apps.filter(a => a.status === 'applied').length,
    interview: apps.filter(a => a.status === 'interview').length,
    offer: apps.filter(a => a.status === 'offer').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-8 pt-8 pb-6">
          <Header
            title="Applications"
            action={
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-md hover:shadow-blue-200 transition-all duration-200">
                <PlusIcon />
                Add Application
              </button>
            }
          />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Total" value={stats.total} color="text-gray-900" />
            <StatCard label="Applied" value={stats.applied} color="text-blue-600" />
            <StatCard label="Interview" value={stats.interview} color="text-amber-600" />
            <StatCard label="Offer" value={stats.offer} color="text-emerald-600" />
            <StatCard label="Rejected" value={stats.rejected} color="text-red-500" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {apps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">No applications yet</p>
                <p className="text-xs text-gray-400">Add your first job application to get started.</p>
              </div>
            ) : (
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
                  {apps.map(app => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
