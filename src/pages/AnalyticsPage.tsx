import { useMemo } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import { MOCK_APPLICATIONS } from '../data/mockApplications'
import { ApplicationStatus } from '../types'
import { STATUS_CONFIG } from '../constants/applicationStatus'

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-500',
  interview: 'bg-amber-400',
  offer: 'bg-emerald-500',
  rejected: 'bg-red-400',
  withdrawn: 'bg-gray-300',
}

const STATUS_TEXT: Record<ApplicationStatus, string> = {
  applied: 'text-blue-600',
  interview: 'text-amber-600',
  offer: 'text-emerald-600',
  rejected: 'text-red-500',
  withdrawn: 'text-gray-500',
}

const STATUS_BG: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-50',
  interview: 'bg-amber-50',
  offer: 'bg-emerald-50',
  rejected: 'bg-red-50',
  withdrawn: 'bg-gray-50',
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

export default function AnalyticsPage() {
  const apps = MOCK_APPLICATIONS

  const counts = useMemo(() => {
    const result = {} as Record<ApplicationStatus, number>
    const statuses: ApplicationStatus[] = ['applied', 'interview', 'offer', 'rejected', 'withdrawn']
    statuses.forEach(s => { result[s] = apps.filter(a => a.status === s).length })
    return result
  }, [apps])

  const total = apps.length
  const interviewRate = total > 0 ? Math.round((counts.interview + counts.offer) / total * 100) : 0
  const offerRate = total > 0 ? Math.round(counts.offer / total * 100) : 0
  const maxCount = Math.max(...Object.values(counts), 1)

  // Group by month
  const byMonth = useMemo(() => {
    const map: Record<string, number> = {}
    apps.forEach(a => {
      const key = a.applied_date.slice(0, 7) // "YYYY-MM"
      map[key] = (map[key] ?? 0) + 1
    })
    const sorted = Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
    return sorted
  }, [apps])

  const maxMonthCount = Math.max(...byMonth.map(([, c]) => c), 1)

  function formatMonth(key: string) {
    const [year, month] = key.split('-')
    return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const statuses: ApplicationStatus[] = ['applied', 'interview', 'offer', 'rejected', 'withdrawn']

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-8 pt-8 pb-10">
          <Header title="Analytics" />

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Applications" value={total} color="text-gray-900" />
            <StatCard label="Interview Rate" value={`${interviewRate}%`} sub="reached interview stage" color="text-amber-600" />
            <StatCard label="Offer Rate" value={`${offerRate}%`} sub="converted to offer" color="text-emerald-600" />
            <StatCard label="Active" value={counts.applied + counts.interview} sub="applied + interview" color="text-blue-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status distribution */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Status Distribution</h2>
              <div className="space-y-3.5">
                {statuses.map(status => {
                  const count = counts[status]
                  const pct = Math.round(count / maxCount * 100)
                  const config = STATUS_CONFIG[status]
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-semibold ${STATUS_TEXT[status]}`}>{config.label}</span>
                        <span className="text-xs font-bold text-gray-700">{count}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${STATUS_COLORS[status]}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Donut-style legend */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-3">
                {statuses.map(status => (
                  <div key={status} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${STATUS_BG[status]}`}>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[status]}`} />
                    <span className={`text-xs font-semibold ${STATUS_TEXT[status]}`}>
                      {STATUS_CONFIG[status].label} — {total > 0 ? Math.round(counts[status] / total * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications per month */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-5">Applications per Month</h2>
              {byMonth.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-sm text-gray-400">No data yet</div>
              ) : (
                <div className="flex items-end gap-3 h-44">
                  {byMonth.map(([key, count]) => {
                    const heightPct = Math.round(count / maxMonthCount * 100)
                    return (
                      <div key={key} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                        <span className="text-xs font-bold text-gray-700">{count}</span>
                        <div className="w-full relative" style={{ height: '120px' }}>
                          <div
                            className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 text-center leading-tight">{formatMonth(key)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Pipeline funnel */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-5">Application Pipeline</h2>
            <div className="flex items-center gap-0 overflow-x-auto pb-2">
              {(['applied', 'interview', 'offer'] as ApplicationStatus[]).map((status, i, arr) => {
                const count = counts[status]
                const prev = i === 0 ? total : counts[arr[i - 1]]
                const convRate = prev > 0 ? Math.round(count / prev * 100) : 0
                return (
                  <div key={status} className="flex items-center flex-1 min-w-0">
                    <div className={`flex-1 rounded-xl p-4 text-center ${STATUS_BG[status]}`}>
                      <p className={`text-2xl font-bold ${STATUS_TEXT[status]}`}>{count}</p>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">{STATUS_CONFIG[status].label}</p>
                      {i > 0 && (
                        <p className="text-xs text-gray-400 mt-1">{convRate}% conversion</p>
                      )}
                    </div>
                    {i < arr.length - 1 && (
                      <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
