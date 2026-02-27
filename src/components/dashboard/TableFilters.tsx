import { ApplicationStatus, SortKey, StatusFilter } from '../../types'
import { STATUS_CONFIG } from '../../constants/applicationStatus'


interface Props {
  search: string
  onSearchChange: (v: string) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (v: StatusFilter) => void
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onSortChange: (key: SortKey) => void
}

const STATUS_CHIPS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'applied', label: STATUS_CONFIG.applied.label },
  { value: 'interview', label: STATUS_CONFIG.interview.label },
  { value: 'offer', label: STATUS_CONFIG.offer.label },
  { value: 'rejected', label: STATUS_CONFIG.rejected.label },
  { value: 'withdrawn', label: STATUS_CONFIG.withdrawn.label },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'date', label: 'Date' },
  { value: 'company', label: 'Company' },
  { value: 'status', label: 'Status' },
]

export default function TableFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortKey,
  sortDir,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Search + Sort row */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search company or position..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-gray-300 bg-white"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-gray-400 font-medium">Sort:</span>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortKey === opt.value
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {opt.label}
              {sortKey === opt.value && (
                <svg
                  className={`w-3 h-3 transition-transform ${sortDir === 'desc' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Status chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {STATUS_CHIPS.map(chip => (
          <button
            key={chip.value}
            onClick={() => onStatusFilterChange(chip.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              statusFilter === chip.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
