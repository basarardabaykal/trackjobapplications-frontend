import { useRef, useState } from 'react'
import { JobApplication, ApplicationStatus } from '../../types'
import { STATUS_CONFIG } from '../../constants/applicationStatus'
import { EditIcon, TrashIcon } from '../icons'

interface Props {
  applications: JobApplication[]
  onEdit: (app: JobApplication) => void
  onDelete: (app: JobApplication) => void
  onStatusChange: (id: number, newStatus: ApplicationStatus) => void
}

const COLUMNS: ApplicationStatus[] = ['applied', 'interview', 'offer', 'rejected', 'withdrawn']

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
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const COLUMN_ACCENT: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-500',
  interview: 'bg-amber-400',
  offer: 'bg-emerald-500',
  rejected: 'bg-red-400',
  withdrawn: 'bg-gray-300',
}

interface CardProps {
  app: JobApplication
  onEdit: (app: JobApplication) => void
  onDelete: (app: JobApplication) => void
  onDragStart: (id: number) => void
  onDragEnd: () => void
  isDragging: boolean
}

function KanbanCard({ app, onEdit, onDelete, onDragStart, onDragEnd, isDragging }: CardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(app.id)}
      onDragEnd={onDragEnd}
      className={`group bg-white rounded-xl border shadow-sm p-4 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'opacity-40 scale-95 border-blue-200'
          : 'border-gray-100 hover:shadow-md hover:border-blue-100'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${getAvatarColor(app.company)}`}>
            {app.company[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-tight truncate">{app.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(app)}
            className="p-1 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(app)}
            className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{app.position}</p>

      {app.notes && (
        <p className="text-xs text-gray-400 italic mb-3 truncate">{app.notes}</p>
      )}

      <p className="text-xs text-gray-400">{formatDate(app.applied_date)}</p>
    </div>
  )
}

export default function KanbanBoard({ applications, onEdit, onDelete, onStatusChange }: Props) {
  const draggedId = useRef<number | null>(null)
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [dragOverCol, setDragOverCol] = useState<ApplicationStatus | null>(null)

  function handleDragStart(id: number) {
    draggedId.current = id
    setDraggingId(id)
  }

  function handleDragEnd() {
    draggedId.current = null
    setDraggingId(null)
    setDragOverCol(null)
  }

  function handleDragOver(e: React.DragEvent, status: ApplicationStatus) {
    e.preventDefault()
    setDragOverCol(status)
  }

  function handleDrop(status: ApplicationStatus) {
    if (draggedId.current !== null) {
      const app = applications.find(a => a.id === draggedId.current)
      if (app && app.status !== status) {
        onStatusChange(draggedId.current, status)
      }
    }
    setDragOverCol(null)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map(status => {
        const colApps = applications.filter(a => a.status === status)
        const config = STATUS_CONFIG[status]
        const isOver = dragOverCol === status

        return (
          <div
            key={status}
            className="flex-shrink-0 w-64"
            onDragOver={e => handleDragOver(e, status)}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => handleDrop(status)}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${COLUMN_ACCENT[status]}`} />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                {config.label}
              </span>
              <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                {colApps.length}
              </span>
            </div>

            {/* Cards */}
            <div
              className={`space-y-2.5 min-h-24 rounded-xl transition-colors duration-150 ${
                isOver ? 'bg-blue-50/60 ring-2 ring-blue-200 ring-dashed p-1' : ''
              }`}
            >
              {colApps.length === 0 && !isOver ? (
                <div className="rounded-xl border-2 border-dashed border-gray-100 py-8 text-center">
                  <p className="text-xs text-gray-300">No applications</p>
                </div>
              ) : (
                colApps.map(app => (
                  <KanbanCard
                    key={app.id}
                    app={app}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={draggingId === app.id}
                  />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
