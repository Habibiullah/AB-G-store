import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const linkCls = (p: string) => `px-4 py-2 rounded-xl hover:opacity-90 ${pathname===p?'bg-brand-600 text-white':'bg-white text-brand-800 shadow'}`
  return (
    <nav className="sticky top-0 bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/60 z-10 border-b">
      <div className="max-w-6xl mx-auto p-4 flex gap-3">
        <Link className={linkCls('/')} to="/">Dashboard</Link>
        <Link className={linkCls('/employees')} to="/employees">Employees</Link>
        <Link className={linkCls('/attendance')} to="/attendance">Attendance</Link>
        <Link className={linkCls('/payroll')} to="/payroll">Payroll</Link>
      </div>
    </nav>
  )
}