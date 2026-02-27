import { useEffect } from 'react'
import { JobApplication } from '../../types'
import { STATUS_CONFIG } from '../../constants/applicationStatus'
import StatusBadge from './StatusBadge'
import { EditIcon, TrashIcon } from '../icons'

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
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface Props {
  app: JobApplication | null
  onClose: () => void
  onEdit: (app: JobApplication) => void
  onDelete: (app: JobApplication) => void
}

export default function ApplicationDrawer({ app, onClose, onEdit, onDelete }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (app) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [app, onClose])

  const open = !!app

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {!app ? null : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Application Detail</span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Company + Position hero */}
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${getAvatarColor(app.company)}`}>
                  {app.company[0].toUpperCase()}
                </div>
                <div className="min-w-0 pt-1">
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">{app.company}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{app.position}</p>
                  <div className="mt-2">
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Details grid */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Applied</p>
                    <p className="text-sm text-gray-800">{formatDate(app.applied_date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Last Updated</p>
                    <p className="text-sm text-gray-800">{formatDateTime(app.updated_at)}</p>
                  </div>
                </div>

                {app.url && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Job Posting</p>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block"
                      >
                        {app.url}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              {app.notes && (
                <>
                  <div className="border-t border-gray-100" />
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Notes</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{app.notes}</p>
                  </div>
                </>
              )}

              {/* Stage timeline */}
              <div className="border-t border-gray-100" />
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Stage</p>
                <div className="flex items-center gap-0">
                  {(['applied', 'interview', 'offer'] as const).map((stage, i) => {
                    const config = STATUS_CONFIG[stage]
                    const stages = ['applied', 'interview', 'offer'] as const
                    const currentIdx = stages.indexOf(app.status as typeof stages[number])
                    const stageIdx = i
                    const isActive = stageIdx === currentIdx
                    const isPast = currentIdx > stageIdx

                    return (
                      <div key={stage} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isActive ? 'bg-blue-600 text-white' : isPast ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {stageIdx + 1}
                          </div>
                          <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                            {config.label}
                          </span>
                        </div>
                        {i < 2 && (
                          <div className={`h-0.5 flex-1 -mt-4 ${isPast || isActive ? 'bg-blue-200' : 'bg-gray-100'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => { onEdit(app); onClose() }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <EditIcon />
                Edit
              </button>
              <button
                onClick={() => { onDelete(app); onClose() }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
