import { useEffect, useRef, useState } from 'react'
import { ApplicationStatus, JobApplication } from '../../types'
import { STATUS_OPTIONS } from '../../constants/applicationStatus'

interface FormData {
  company: string
  position: string
  status: ApplicationStatus
  applied_date: string
  url: string
  notes: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>) => void
  initialData?: JobApplication
}

const INITIAL_FORM: FormData = {
  company: '',
  position: '',
  status: 'applied',
  applied_date: new Date().toISOString().split('T')[0],
  url: '',
  notes: '',
}

function toFormData(app: JobApplication): FormData {
  return {
    company: app.company,
    position: app.position,
    status: app.status,
    applied_date: app.applied_date,
    url: app.url ?? '',
    notes: app.notes,
  }
}

export default function AddApplicationModal({ open, onClose, onSubmit, initialData }: Props) {
  const isEdit = !!initialData
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setForm(initialData ? toFormData(initialData) : INITIAL_FORM)
      setErrors({})
      setTimeout(() => firstInputRef.current?.focus(), 50)
    }
  }, [open, initialData])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  function validate(): boolean {
    const next: Partial<FormData> = {}
    if (!form.company.trim()) next.company = 'Company is required'
    if (!form.position.trim()) next.position = 'Position is required'
    if (!form.applied_date) next.applied_date = 'Date is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      company: form.company.trim(),
      position: form.position.trim(),
      status: form.status,
      applied_date: form.applied_date,
      url: form.url.trim() || undefined,
      notes: form.notes.trim(),
    })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? 'Edit Application' : 'Add Application'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Company <span className="text-red-400">*</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                placeholder="e.g. Stripe"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors placeholder:text-gray-300 ${
                  errors.company
                    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Position <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                value={form.position}
                onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors placeholder:text-gray-300 ${
                  errors.position
                    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as ApplicationStatus }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors bg-white"
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Applied Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={form.applied_date}
                  onChange={e => setForm(f => ({ ...f, applied_date: e.target.value }))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    errors.applied_date
                      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                {errors.applied_date && <p className="mt-1 text-xs text-red-500">{errors.applied_date}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job URL</label>
              <input
                type="url"
                placeholder="https://company.com/jobs/..."
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
              <textarea
                placeholder="Interview notes, questions, links..."
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors resize-none placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-md hover:shadow-blue-200 transition-all duration-200"
            >
              {isEdit ? 'Save Changes' : 'Save Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
