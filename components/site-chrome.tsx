'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPrivateArea = pathname === '/admin' || pathname.startsWith('/admin/') || pathname === '/portal' || pathname.startsWith('/portal/')

  if (isPrivateArea) return <>{children}</>

  return <><Navbar /><main id="main">{children}</main><Footer /></>
}
