import { useMemo, useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import StatCard from '../components/dashboard/StatCard'
import ApplicationsTable from '../components/dashboard/ApplicationsTable'
import KanbanBoard from '../components/dashboard/KanbanBoard'
import AddApplicationModal from '../components/dashboard/AddApplicationModal'
import ConfirmModal from '../components/dashboard/ConfirmModal'
import TableFilters from '../components/dashboard/TableFilters'
import { PlusIcon, TableIcon, KanbanIcon } from '../components/icons'
import { MOCK_APPLICATIONS } from '../data/mockApplications'
import { ApplicationStatus, JobApplication } from '../types'

type ViewMode = 'table' | 'kanban'

type SortKey = 'date' | 'company' | 'status'
type StatusFilter = ApplicationStatus | 'all'

const STATUS_ORDER: ApplicationStatus[] = ['applied', 'interview', 'offer', 'rejected', 'withdrawn']

export default function DashboardPage() {
  const [apps, setApps] = useState<JobApplication[]>(MOCK_APPLICATIONS)

  // View mode
  const [view, setView] = useState<ViewMode>('table')

  // Modal state
  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<JobApplication | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<JobApplication | null>(null)

  // Filter / sort state
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function handleSortChange(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return apps
      .filter(a => statusFilter === 'all' || a.status === statusFilter)
      .filter(a =>
        a.company.toLowerCase().includes(q) || a.position.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        let cmp = 0
        if (sortKey === 'date') cmp = a.applied_date.localeCompare(b.applied_date)
        if (sortKey === 'company') cmp = a.company.localeCompare(b.company)
        if (sortKey === 'status') cmp = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [apps, search, statusFilter, sortKey, sortDir])

  const stats = {
    total: apps.length,
    applied: apps.filter(a => a.status === 'applied').length,
    interview: apps.filter(a => a.status === 'interview').length,
    offer: apps.filter(a => a.status === 'offer').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  function handleAdd(data: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>) {
    const now = new Date().toISOString()
    setApps(prev => [{ ...data, id: Date.now(), created_at: now, updated_at: now }, ...prev])
  }

  function handleEdit(data: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>) {
    if (!editTarget) return
    setApps(prev =>
      prev.map(a =>
        a.id === editTarget.id ? { ...a, ...data, updated_at: new Date().toISOString() } : a,
      ),
    )
  }

  function handleDelete() {
    if (!deleteTarget) return
    setApps(prev => prev.filter(a => a.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-8 pt-8 pb-6">
          <Header
            title="Applications"
            action={
              <div className="flex items-center gap-2">
                {/* View toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
                  <button
                    onClick={() => setView('table')}
                    className={`p-1.5 rounded-lg transition-colors ${view === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Table view"
                  >
                    <TableIcon />
                  </button>
                  <button
                    onClick={() => setView('kanban')}
                    className={`p-1.5 rounded-lg transition-colors ${view === 'kanban' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Kanban view"
                  >
                    <KanbanIcon />
                  </button>
                </div>

                <button
                  onClick={() => setAddOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-md hover:shadow-blue-200 transition-all duration-200"
                >
                  <PlusIcon />
                  Add Application
                </button>
              </div>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Total" value={stats.total} color="text-gray-900" />
            <StatCard label="Applied" value={stats.applied} color="text-blue-600" />
            <StatCard label="Interview" value={stats.interview} color="text-amber-600" />
            <StatCard label="Offer" value={stats.offer} color="text-emerald-600" />
            <StatCard label="Rejected" value={stats.rejected} color="text-red-500" />
          </div>

          <TableFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortKey={sortKey}
            sortDir={sortDir}
            onSortChange={handleSortChange}
          />

          {view === 'table' ? (
            <ApplicationsTable
              applications={filtered}
              onEdit={app => setEditTarget(app)}
              onDelete={app => setDeleteTarget(app)}
            />
          ) : (
            <KanbanBoard
              applications={filtered}
              onEdit={app => setEditTarget(app)}
              onDelete={app => setDeleteTarget(app)}
            />
          )}
        </div>
      </div>

      <AddApplicationModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      <AddApplicationModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEdit}
        initialData={editTarget ?? undefined}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete application"
        description={
          deleteTarget
            ? `Remove ${deleteTarget.company} — ${deleteTarget.position}? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
