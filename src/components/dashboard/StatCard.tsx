interface Props {
  label: string
  value: string | number
  color: string
}

export default function StatCard({ label, value, color }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
