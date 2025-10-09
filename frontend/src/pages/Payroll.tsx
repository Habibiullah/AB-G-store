import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export default function Payroll(){
  const { data } = useQuery({ queryKey:['payroll'], queryFn: async ()=> (await api.get('/payroll')).data })
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold text-brand-800 mb-3">Payroll</h2>
      <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}