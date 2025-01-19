import DashboardNavigation from './components/Navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardNavigation />
      {children}
    </div>
  )
}
