import { AdminSidebar } from '@/components/admin/sidebar'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="bg-background flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-10 py-12">{children}</div>
      </main>
    </div>
  )
}
