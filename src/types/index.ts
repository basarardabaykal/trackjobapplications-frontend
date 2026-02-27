export interface User {
  id: number
  email: string
  username: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export type ApplicationStatus =
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn'

export interface JobApplication {
  id: number
  company: string
  position: string
  status: ApplicationStatus
  applied_date: string
  url?: string
  notes: string
  created_at: string
  updated_at: string
}

export type ViewMode = 'table' | 'kanban'
export type SortKey = 'date' | 'company' | 'status'
export type StatusFilter = ApplicationStatus | 'all'
