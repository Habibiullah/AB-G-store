import DataCard from '../components/DataCard'

export default function Dashboard(){
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <DataCard title="Employees" value={42} hint="active" />
      <DataCard title="Attendance (today)" value="38 present" />
      <DataCard title="Payroll (this month)" value="$78k" />
      <DataCard title="New Hires" value={3} />
    </div>
  )
}