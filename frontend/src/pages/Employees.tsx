import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useState } from 'react'

export default function Employees(){
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey:['employees'], queryFn: async ()=> (await api.get('/employees')).data })
  const [form, setForm] = useState({empCode:'', department:'', designation:'', salary:0})

  const add = useMutation({
    mutationFn: async ()=> (await api.post('/employees', form)).data,
    onSuccess: ()=> qc.invalidateQueries({queryKey:['employees']})
  })

  return (
    <div className="grid md:grid-cols-[2fr,1fr] gap-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-brand-800">Employees</h2>
        <div className="rounded-2xl overflow-hidden bg-white shadow">
          <table className="w-full text-sm">
            <thead className="bg-brand-200 text-brand-800">
              <tr>
                <th className="text-left p-3">Code</th>
                <th className="text-left p-3">Dept</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Salary</th>
              </tr>
            </thead>
            <tbody>
              {(data||[]).map((e: any)=> (
                <tr key={e._id} className="odd:bg-white even:bg-brand-50">
                  <td className="p-3">{e.empCode}</td>
                  <td className="p-3">{e.department}</td>
                  <td className="p-3">{e.designation}</td>
                  <td className="p-3">${e.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-medium text-brand-800">Add Employee</h3>
        <div className="mt-3 grid gap-2">
          {['empCode','department','designation','salary'].map((k)=> (
            <input key={k} placeholder={k} className="border rounded-xl px-3 py-2" value={(form as any)[k] as any}
              onChange={e=> setForm({...form, [k]: k==='salary'? Number(e.target.value): e.target.value})} />
          ))}
          <button onClick={()=>add.mutate()} className="px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-800">Save</button>
        </div>
      </div>
    </div>
  )
}