import { useMemo, useState } from 'react'
import { ApplicationStatus, JobApplication, SortKey, StatusFilter } from '../types'

const STATUS_ORDER: ApplicationStatus[] = ['applied', 'interview', 'offer', 'rejected', 'withdrawn']

export function useApplicationFilters(apps: JobApplication[]) {
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

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortKey,
    sortDir,
    handleSortChange,
    filtered,
  }
}
