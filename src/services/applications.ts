import api from '../lib/axios'
import { JobApplication } from '../types'

type CreatePayload = Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>
type UpdatePayload = Partial<CreatePayload>

export async function getApplications(): Promise<JobApplication[]> {
  const { data } = await api.get<JobApplication[]>('/applications/')
  return data
}

export async function createApplication(payload: CreatePayload): Promise<JobApplication> {
  const { data } = await api.post<JobApplication>('/applications/', payload)
  return data
}

export async function updateApplication(id: number, payload: UpdatePayload): Promise<JobApplication> {
  const { data } = await api.patch<JobApplication>(`/applications/${id}/`, payload)
  return data
}

export async function deleteApplication(id: number): Promise<void> {
  await api.delete(`/applications/${id}/`)
}
