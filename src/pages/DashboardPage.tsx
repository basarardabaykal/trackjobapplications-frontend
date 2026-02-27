import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import StatCard from '../components/dashboard/StatCard'
import ApplicationsTable from '../components/dashboard/ApplicationsTable'
import { MOCK_APPLICATIONS } from '../data/mockApplications'

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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Total" value={stats.total} color="text-gray-900" />
            <StatCard label="Applied" value={stats.applied} color="text-blue-600" />
            <StatCard label="Interview" value={stats.interview} color="text-amber-600" />
            <StatCard label="Offer" value={stats.offer} color="text-emerald-600" />
            <StatCard label="Rejected" value={stats.rejected} color="text-red-500" />
          </div>

          <ApplicationsTable applications={apps} />
        </div>
      </div>
    </div>
  )
}
